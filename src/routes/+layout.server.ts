import { db } from '$lib/server/db';
import { tag, libraryTag, library } from '$lib/server/db/schema';
import { sql, eq, isNull } from 'drizzle-orm';

export async function load() {
	// Get all tags with their counts (only calculated once at layout level)
	const tagsWithCounts = await db
		.select({
			name: tag.name,
			count: sql<number>`count(DISTINCT ${libraryTag.libraryId})`
		})
		.from(tag)
		.leftJoin(libraryTag, eq(tag.id, libraryTag.tagId))
		.groupBy(tag.id, tag.name)
		.orderBy(tag.name);

	// Get count of untagged libraries
	const untaggedCount = await db
		.select({ count: sql<number>`count(DISTINCT ${library.id})` })
		.from(library)
		.leftJoin(libraryTag, eq(library.id, libraryTag.libraryId))
		.where(isNull(libraryTag.tagId));

	// Format tags with counts
	const tags = [
		{ name: 'untagged', count: untaggedCount[0].count },
		...tagsWithCounts.map((t) => ({ name: t.name, count: t.count }))
	];

	return {
		tags
	};
}
