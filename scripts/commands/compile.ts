import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import lunr from 'lunr';
import { loadLibraries, ASSETS_DIR, Logger } from '../utils';

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
		const uniqueTags = Array.from(new Set(allTags)).sort();
		logger.info(`Found ${uniqueTags.length} unique tags`);

		// Create a serializable object with the index, tags, and library data
		const compiledData = {
			index: searchIndex,
			tags: uniqueTags,
			libraries
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
