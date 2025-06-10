import z from 'zod';

export const libraryRecordSchema = z.object({
	url: z.string().url(),
	lastChecked: z.string().nullable()
});

export type LibraryRecord = z.infer<typeof libraryRecordSchema>;
