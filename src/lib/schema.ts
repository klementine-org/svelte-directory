import { z } from 'zod';
import {
	PAGINATION_DEFAULTS,
	PaginationParamEnum,
	QUERY_DEFAULTS,
	QueryParamEnum,
	SortOptionEnum
} from './constants';

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
	topics: z.array(z.string()),
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
	[QueryParamEnum.SORT]: z
		.enum([SortOptionEnum.NAME, SortOptionEnum.STARS, SortOptionEnum.LAST_UPDATED])
		.catch(QUERY_DEFAULTS.sortOption), // We need .catch here, because on initial load no default params are provided, only after the first load query params will be set in the client.
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
