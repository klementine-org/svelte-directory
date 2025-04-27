export enum SortKeyEnum {
	NAME = 'name',
	STARS = 'stars',
	LAST_UPDATED = 'lastUpdated'
}

export enum SortDirectionEnum {
	ASC = 'asc',
	DESC = 'desc'
}

export enum QueryParamEnum {
	SEARCH = 'search',
	SORT_KEY = 'sortKey',
	SORT_DIRECTION = 'sortDirection',
	TAGS = 'tags'
}

export const QUERY_DEFAULTS = {
	[QueryParamEnum.SORT_KEY]: SortKeyEnum.NAME,
	[QueryParamEnum.SORT_DIRECTION]: SortDirectionEnum.ASC
};

export enum PaginationParamEnum {
	LIMIT = 'limit',
	SKIP = 'skip'
}

export const PAGINATION_DEFAULTS = {
	limit: 50,
	skip: 0
} as const;
