import {
	pgTable,
	uuid,
	integer,
	text,
	jsonb,
	timestamp,
	boolean,
	primaryKey,
	index
} from 'drizzle-orm/pg-core';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { relations, sql } from 'drizzle-orm';

export const library = pgTable(
	'library',
	{
		id: uuid('id').primaryKey(),
		name: text('name').notNull(),
		description: text('description'),
		owner: text('owner'),
		// TODO: Store avatars as blob in the future and use URL in database
		ownerAvatarBase64: text('owner_avatar_base64'),
		authors: jsonb('authors').$type<string[]>(),
		websiteUrl: text('website_url'),
		githubUrl: text('github_url'),
		githubTopics: jsonb('github_topics').$type<string[]>(),
		stars: integer('stars'),
		lastUpdated: timestamp('last_updated'),
		license: text('license'),
		version: text('version'),
		markedForDeletion: boolean('marked_for_deletion').notNull().default(false)
	},
	(table) => [
		// GIN index for full-text search on name, description, and owner
		// Using setweight to prioritize name matches over description and owner
		index('library_search_index').using(
			'gin',
			sql`(
			setweight(to_tsvector('english', coalesce(${table.name}, '')), 'A') ||
			setweight(to_tsvector('english', coalesce(${table.description}, '')), 'B') ||
			setweight(to_tsvector('english', coalesce(${table.owner}, '')), 'C')
		)`
		)
	]
);

export const tag = pgTable('tag', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull().unique(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const libraryTag = pgTable(
	'library_tag',
	{
		libraryId: uuid('library_id')
			.notNull()
			.references(() => library.id, { onDelete: 'cascade' }),
		tagId: uuid('tag_id')
			.notNull()
			.references(() => tag.id, { onDelete: 'cascade' })
	},
	(table) => ({
		pk: primaryKey({ columns: [table.libraryId, table.tagId] })
	})
);

// Relations
export const libraryRelations = relations(library, ({ many }) => ({
	libraryTags: many(libraryTag)
}));

export const tagRelations = relations(tag, ({ many }) => ({
	libraryTags: many(libraryTag)
}));

export const libraryTagRelations = relations(libraryTag, ({ one }) => ({
	library: one(library, {
		fields: [libraryTag.libraryId],
		references: [library.id]
	}),
	tag: one(tag, {
		fields: [libraryTag.tagId],
		references: [tag.id]
	})
}));

export type LibrarySelect = InferSelectModel<typeof library>;
export type LibraryInsert = InferInsertModel<typeof library>;
export type TagSelect = InferSelectModel<typeof tag>;
export type TagInsert = InferInsertModel<typeof tag>;
export type LibraryTagSelect = InferSelectModel<typeof libraryTag>;
export type LibraryTagInsert = InferInsertModel<typeof libraryTag>;
