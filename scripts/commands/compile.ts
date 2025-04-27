import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import lunr from 'lunr';
import { loadLibraries, ASSETS_DIR, Logger } from '../utils';
import type { Library } from '$lib/types';
import _ from 'lodash';

const logger = new Logger('compile');

const command = new Command('compile')
	.description('Compile library data into a unified JSON file with search index')
	.option('-o, --output <path>', 'Custom output path for the compiled data')
	.action(async (options) => {
		const libraries = loadLibraries();
		logger.info(`Loaded ${libraries.length} libraries`);

		// Create search index
		logger.await('Creating search index...');
		const searchIndex = lunr(function () {
			// Define the fields to index
			this.field('id');
			this.field('name', { boost: 10 }); // Boost name for higher relevance
			this.field('description', { boost: 5 }); // Boost description for higher relevance
			this.field('owner');
			this.field('authors');
			this.field('topics', { boost: 5 }); // Boost tags for higher relevance
			// TODO: license field are not displayed in the UI yet, so we can ignore them for now
			// this.field('license');

			// Reference field for retrieving documents
			this.ref('id');

			// Add each library to the index
			libraries.forEach((library) => {
				// Convert arrays to strings for indexing
				const indexableLibrary = {
					...library,
					authors: library.authors.join(' '),
					topics: library.topics.join(' ')
				};

				this.add(indexableLibrary);
			});
		});

		// Extract unique tags and sort them
		const allTags = libraries.flatMap((library) => library.topics);
		let countedTags = _.countBy(allTags);
		// Omit all tags with count 1
		countedTags = _.omitBy(countedTags, (count) => count <= 1);
		// Omit specific tags
		const SPECIFIC_TAGS = ['svelte', 'sveltejs', 'vue', 'react'];
		countedTags = _.omit(countedTags, SPECIFIC_TAGS);
		const uniqueTags = Array.from(Object.keys(countedTags)).sort();
		logger.info(`Keeping ${uniqueTags.length} tags: ${uniqueTags.join(', ')}`);

		const libraryMap = libraries.reduce(
			(acc, library) => {
				// Create a map of library IDs to their respective objects
				acc[library.id] = library;
				return acc;
			},
			{} as Record<string, Library>
		);

		// Create a serializable object with the index, tags, and library data
		const compiledData = {
			index: searchIndex,
			tags: uniqueTags,
			libraries: libraryMap
		};

		// Determine output path
		const outputPath = options.output || path.join(ASSETS_DIR, 'compiled-data.json');

		// Ensure directory exists
		fs.mkdirSync(path.dirname(outputPath), { recursive: true });

		// Write the unified data to a file
		fs.writeFileSync(outputPath, JSON.stringify(compiledData, null, 2), 'utf8');
		logger.success(`Compiled data created and saved to ${outputPath}`);
	});

export default command;
