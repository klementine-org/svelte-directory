import type { Library } from '$lib/types';
import compiledData from '$lib/assets/compiled-data.json' assert { type: 'json' };
import _ from 'lodash';
import lunr from 'lunr';
import { QueryParamEnum, PaginationParamEnum } from '$lib/constants';
import { queryParamsSchema } from '$lib/schema';

const { libraries, index, tags } = compiledData;

// TODO: replace lunr, since it sometimes retunrns empty results for some queries (https://github.com/olivernn/lunr.js/issues/38)
// Load search index
const searchIndex = lunr.Index.load(index);

export const load = async ({ url }) => {
	const params = queryParamsSchema.parse({
		[QueryParamEnum.SEARCH]: url.searchParams.get(QueryParamEnum.SEARCH) || undefined,
		[QueryParamEnum.TAGS]: url.searchParams.get(QueryParamEnum.TAGS) || undefined,
		[QueryParamEnum.SORT_KEY]: url.searchParams.get(QueryParamEnum.SORT_KEY) || undefined,
		[QueryParamEnum.SORT_DIRECTION]:
			url.searchParams.get(QueryParamEnum.SORT_DIRECTION) || undefined,
		[PaginationParamEnum.SKIP]: url.searchParams.get(PaginationParamEnum.SKIP) || undefined,
		[PaginationParamEnum.LIMIT]: url.searchParams.get(PaginationParamEnum.LIMIT) || undefined
	});

	let results: Library[] = Object.values(libraries);

	// Apply search if search term is more than 3 letters
	if (_.gt(params.search?.length, 1)) {
		const matches = searchIndex.search(params[QueryParamEnum.SEARCH] as string);
		results = matches.map((m) => libraries[m.ref as keyof typeof libraries]);
	}

	// Filter by tags (keeps library if library tags include all selected tags)
	if (params[QueryParamEnum.TAGS]) {
		const tagSet = new Set(params[QueryParamEnum.TAGS]);
		const includesAllSelectedTags = ({ topics }: Library) => new Set(topics).isSupersetOf(tagSet);
		results = results.filter(includesAllSelectedTags);
	}

	// Sort libraries based on sort key and direction
	const sortKey = params[QueryParamEnum.SORT_KEY];
	const sortDirection = params[QueryParamEnum.SORT_DIRECTION];
	results = _.orderBy(results, [sortKey], sortDirection);

	const totalCount = results.length;

	// Apply pagination
	const skip = params.skip;
	const limit = params.limit;
	results = results.slice(skip, skip + limit);

	return {
		libraries: results,
		tags,
		count: totalCount
	};
};
