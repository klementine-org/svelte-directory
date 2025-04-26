import type { Library } from '$lib/types';
import compiledData from '$lib/assets/compiled-data.json' assert { type: 'json' }
import _ from 'lodash';
import lunr from 'lunr';
import { QueryParamEnum, PaginationParamEnum } from '$lib/constants';
import { queryParamsSchema } from '$lib/schema';

const { libraries, index, tags } = compiledData;

export const load = async ({ url }) => {
	const params = queryParamsSchema.parse({
		'search': url.searchParams.get(QueryParamEnum.SEARCH) || undefined,
		'tags': url.searchParams.get(QueryParamEnum.TAGS) || undefined,
		'sort': url.searchParams.get(QueryParamEnum.SORT) || undefined,
		'skip': url.searchParams.get(PaginationParamEnum.SKIP) || undefined,
		'limit': url.searchParams.get(PaginationParamEnum.LIMIT) || undefined
	});

	// Load search index
	const searchIndex = lunr.Index.load(index);

	let results: Library[] = Object.values(libraries);

	// Apply search if search term is more than 3 letters
	if (params.search && params.search.length > 3) {
		const matches = searchIndex.search(params.search);
		results = matches.map((m) => libraries[m.ref as keyof typeof libraries] as Library);
	}

	// Filter by tags (keeps library if library tags include all selected tags)
	if (params.tags) {
		const tagSet = new Set(params.tags);
		const includesAllSelectedTags = ({ topics }: Library) => new Set(topics).isSupersetOf(tagSet);
		results = results.filter(includesAllSelectedTags);
	}

	// Sort libraries based on sort parameter
	const sortKey = params.sort;
	results = _.sortBy(results, (lib) => lib[sortKey]);

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
