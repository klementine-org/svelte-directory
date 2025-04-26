import { z } from 'zod';

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
