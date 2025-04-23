export enum SortOptionEnum {
	NAME = 'name',
	STARS = 'stars',
	LAST_UPDATED = 'lastUpdated',
}

export enum QueryParamEnum {
	SEARCH = 'search',
	SORT = 'sort',
	TAGS = 'tags',
}

export enum PaginationParamEnum {
	LIMIT = 'limit',
	SKIP = 'skip',
}

export const PAGINATION_DEFAULTS = {
	limit: 50,
	skip: 0,
} as const;
