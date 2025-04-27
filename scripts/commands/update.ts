import { Command } from 'commander';
import { librarySchema } from '$lib/schema';
import {
	convertToLibrary,
	createLibraryId,
	extractOwnerAndRepo,
	getRepo,
	loadLibraries,
	Logger,
	saveLibraryFile
} from '../utils';

const logger = new Logger('update');

const command = new Command('update')
	.description('Update library entries with latest GitHub information')
	.argument(
		'[githubUrls...]',
		'GitHub URLs of specific libraries to update (defaults to all if none provided)'
	)
	.action(async (githubUrls: string[]) => {
		let librariesToUpdate = loadLibraries();

		// Filter libraries if specific GitHub URLs are provided
		if (githubUrls?.length > 0) {
			const libraryIds = githubUrls
				.map((url) => extractOwnerAndRepo(url))
				.map(({ ownerId, repoId }) => createLibraryId(ownerId, repoId));
			librariesToUpdate = librariesToUpdate.filter((lib) => libraryIds.includes(lib.id));

			// Check if all provided GitHub URLs match libraries in the database
			if (libraryIds.length !== librariesToUpdate.length) {
				const notFoundIds = libraryIds.filter(
					(id) => !librariesToUpdate.some((lib) => lib.id === id)
				);
				logger.error(
					`❌ Some provided GitHub URLs do not match any libraries in the database: ${notFoundIds.join(', ')}`
				);
				logger.note('⚠️ Please check the URLs and add them to the directory if necessary.');
				process.exit(1);
			}
		}

		const errors = [];
		let updatedCount = 0;

		// Process libraries sequentially to avoid rate limiting
		logger.await(`Updating ${librariesToUpdate.length} libraries...`);
		for (const library of librariesToUpdate) {
			try {
				const repo = await getRepo(library.owner, library.name);
				const newLib = await convertToLibrary(repo);

				librarySchema.parse(newLib);
				saveLibraryFile(newLib, true);
				updatedCount++;
			} catch (error) {
				errors.push(error);
			}
		}

		logger.success(`Updated ${updatedCount} libraries successfully.`);
		if (errors.length > 0) {
			logger.error(`Encountered ${errors.length} errors during the update process.`);
			errors.forEach((error) => {
				logger.error(error);
			});
		}
	});

export default command;
