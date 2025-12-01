import { queryParamsSchema } from '$lib/schema';
import { PaginationParamEnum, QueryParamEnum } from '$lib/constants';
import { db } from '$lib/server/db';
import { library, tag, libraryTag } from '$lib/server/db/schema';
import { sql, desc, asc, and, or, inArray, eq, isNull } from 'drizzle-orm';

export async function load({ url }) {
	const params = queryParamsSchema.parse({
		[QueryParamEnum.SEARCH]: url.searchParams.get(QueryParamEnum.SEARCH) || undefined,
		[QueryParamEnum.TAGS]: url.searchParams.get(QueryParamEnum.TAGS) || undefined,
		[QueryParamEnum.SORT_KEY]: url.searchParams.get(QueryParamEnum.SORT_KEY) || undefined,
		[QueryParamEnum.SORT_DIRECTION]:
			url.searchParams.get(QueryParamEnum.SORT_DIRECTION) || undefined,
		[PaginationParamEnum.SKIP]: url.searchParams.get(PaginationParamEnum.SKIP) || undefined,
		[PaginationParamEnum.LIMIT]: url.searchParams.get(PaginationParamEnum.LIMIT) || undefined
	});

	const conditions = [];

	// Prepare search query if searching (used for both filtering and ranking)
	const hasSearch = params[QueryParamEnum.SEARCH] && params[QueryParamEnum.SEARCH].length > 1;
	let tsqueryString = '';

	if (hasSearch) {
		const terms = params[QueryParamEnum.SEARCH]!.trim()
			.replace(/[^\w\s]/g, ' ')
			.split(/\s+/)
			.filter((term) => term.length > 0);

		if (terms.length > 0) {
			tsqueryString = terms.map((term) => `${term}:*`).join(' & ');
			console.log('Search terms:', terms, '-> tsquery:', tsqueryString);

			// Add full-text search filter
			const searchVector = sql`
				setweight(to_tsvector('english', coalesce(${library.name}, '')), 'A') ||
				setweight(to_tsvector('english', coalesce(${library.description}, '')), 'B') ||
				setweight(to_tsvector('english', coalesce(${library.owner}, '')), 'C')
			`;
			conditions.push(sql`${searchVector} @@ to_tsquery('english', ${tsqueryString})`);
		}
	}

	// Tag filtering with OR operation
	if (params[QueryParamEnum.TAGS] && params[QueryParamEnum.TAGS].length > 0) {
		const selectedTags = params[QueryParamEnum.TAGS];
		const tagFilters = [];

		// Add untagged filter if selected
		if (selectedTags.includes('untagged')) {
			tagFilters.push(isNull(tag.id));
		}

		// Add filters for normal tags
		const normalTags = selectedTags.filter((t) => t !== 'untagged');
		if (normalTags.length > 0) {
			const tagRecords = await db
				.select({ id: tag.id, name: tag.name })
				.from(tag)
				.where(inArray(tag.name, normalTags));

			const tagIds = tagRecords.map((t) => t.id);

			if (tagIds.length > 0) {
				tagFilters.push(inArray(tag.id, tagIds));
			}
		}

		// Combine all tag filters with OR
		if (tagFilters.length > 0) {
			conditions.push(tagFilters.length === 1 ? tagFilters[0] : or(...tagFilters));
		}
	}

	// Build query with all filters applied before groupBy
	let queryBuilder = db
		.select({
			id: library.id,
			name: library.name,
			description: library.description,
			owner: library.owner,
			ownerAvatarBase64: library.ownerAvatarBase64,
			authors: library.authors,
			websiteUrl: library.websiteUrl,
			githubUrl: library.githubUrl,
			githubTopics: library.githubTopics,
			stars: library.stars,
			lastUpdated: library.lastUpdated,
			license: library.license,
			version: library.version,
			markedForDeletion: library.markedForDeletion,
			tags: sql<string[]>`COALESCE(
				array_agg(DISTINCT ${tag.name} ORDER BY ${tag.name}) FILTER (WHERE ${tag.name} IS NOT NULL),
				ARRAY[]::text[]
			)`,
			// Use window function to get total count in the same query!
			totalCount: sql<number>`count(*) OVER()`,
			// Add search rank for relevance sorting when searching
			...(hasSearch && tsqueryString
				? {
						searchRank: sql<number>`ts_rank(
					setweight(to_tsvector('english', coalesce(${library.name}, '')), 'A') ||
					setweight(to_tsvector('english', coalesce(${library.description}, '')), 'B') ||
					setweight(to_tsvector('english', coalesce(${library.owner}, '')), 'C'),
					to_tsquery('english', ${tsqueryString})
				)`
					}
				: {})
		})
		.from(library)
		.leftJoin(libraryTag, eq(library.id, libraryTag.libraryId))
		.leftJoin(tag, eq(libraryTag.tagId, tag.id));

	// Apply conditions before groupBy
	if (conditions.length > 0) {
		queryBuilder = queryBuilder.where(and(...conditions)) as typeof queryBuilder;
	}

	// Apply sorting
	const sortKey = params[QueryParamEnum.SORT_KEY];
	const sortDirection = params[QueryParamEnum.SORT_DIRECTION];

	let query = queryBuilder.groupBy(library.id);

	// Apply sorting after groupBy
	// When searching, prioritize relevance rank; otherwise use user-selected sorting
	if (hasSearch && tsqueryString) {
		// Sort by search relevance (highest rank first)
		query = query.orderBy(
			desc(sql`ts_rank(
				setweight(to_tsvector('english', coalesce(${library.name}, '')), 'A') ||
				setweight(to_tsvector('english', coalesce(${library.description}, '')), 'B') ||
				setweight(to_tsvector('english', coalesce(${library.owner}, '')), 'C'),
				to_tsquery('english', ${tsqueryString})
			)`)
		) as typeof query;
	} else {
		// Map of sortable columns
		const sortableColumns = {
			name: library.name,
			stars: library.stars,
			lastUpdated: library.lastUpdated,
			owner: library.owner
		} as const;

		if (sortKey && sortKey in sortableColumns) {
			const column = sortableColumns[sortKey as keyof typeof sortableColumns];
			query = query.orderBy(sortDirection === 'desc' ? desc(column) : asc(column)) as typeof query;
		}
	}

	// Execute query with pagination
	const results = await query.limit(params.limit).offset(params.skip);

	// Extract total count from first row (window function returns same count for all rows)
	const totalCount = results.length > 0 ? results[0].totalCount : 0;

	// Remove totalCount from results before returning
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const libraries = results.map(({ totalCount: _count, ...lib }) => lib);

	return {
		libraries,
		count: totalCount
	};
}
