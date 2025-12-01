import { z } from 'zod';
import {
	PAGINATION_DEFAULTS,
	PaginationParamEnum,
	QUERY_DEFAULTS,
	QueryParamEnum,
	SortDirectionEnum,
	SortKeyEnum
} from './constants';

// TODO: merge with server-side schema to avoid duplication
export const librarySchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	owner: z.string(),
	ownerAvatarBase64: z.string().optional(),
	authors: z.array(z.string()),
	websiteUrl: z.string(),
	githubUrl: z.string(),
	stars: z.number(),
	lastUpdated: z.string(),
	githubTopics: z.array(z.string()),
	tags: z.array(z.string()),
	license: z.string(),
	version: z.string()
});

export const queryParamsSchema = z.object({
	[QueryParamEnum.SEARCH]: z.string().optional().catch(undefined),
	[QueryParamEnum.TAGS]: z
		.preprocess((val) => (typeof val === 'string' ? JSON.parse(val) : val), z.array(z.string()))
		.optional()
		.transform((val) => {
			// Either filter by tags (which requires at least one tag) or don't filter at all (which is null)
			// If an empty was empty, it would filter out all libraries, so we return null instead
			return val?.length === 0 ? null : val;
		}),
	[QueryParamEnum.SORT_KEY]: z
		.enum([SortKeyEnum.NAME, SortKeyEnum.STARS, SortKeyEnum.LAST_UPDATED])
		.catch(QUERY_DEFAULTS[QueryParamEnum.SORT_KEY]), // We need .catch here, because on initial load no default params are provided, only after the first load query params will be set in the client.
	[QueryParamEnum.SORT_DIRECTION]: z
		.enum([SortDirectionEnum.ASC, SortDirectionEnum.DESC])
		.catch(QUERY_DEFAULTS[QueryParamEnum.SORT_DIRECTION]), // We need .catch here, because on initial load no default params are provided, only after the first load query params will be set in the client.
	[PaginationParamEnum.LIMIT]: z.coerce
		.number()
		.positive()
		.optional()
		.default(PAGINATION_DEFAULTS.limit),
	[PaginationParamEnum.SKIP]: z.coerce
		.number()
		.nonnegative()
		.optional()
		.default(PAGINATION_DEFAULTS.skip)
});
