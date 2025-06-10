import { Command } from 'commander';
import { librarySchema } from '$lib/schema';
import {
	convertToLibrary,
	extractOwnerAndRepo,
	getRepo,
	loadLibraryUrls,
	saveLibraryFile
} from '../utils';
import pLimit from 'p-limit';

const CONCURRENCY_LIMIT = 50;

const command = new Command('update')
	.description('Update library entries with latest GitHub information')
	.argument(
		'[githubUrls...]',
		'GitHub URLs of specific libraries to update (defaults to all if none provided)'
	)
	.action(async (libraryUrls: string[]) => {
		const allLibraryUrls = loadLibraryUrls();
		const libraryUrlsToProcess =
			libraryUrls.length > 0
				? allLibraryUrls.filter((record) => libraryUrls.includes(record.url))
				: allLibraryUrls;

		if (libraryUrls.length > libraryUrlsToProcess.length) {
			console.error(
				`Provided GitHub URLs do not match any libraries. Found ${libraryUrlsToProcess.length} matching libraries.`
			);
			return;
		}

		// Set a concurrency limit to avoid overwhelming the GitHub API
		const limit = pLimit(CONCURRENCY_LIMIT);

		console.log(
			`Processing ${libraryUrlsToProcess.length} libraries with concurrency limit of ${CONCURRENCY_LIMIT}`
		);

		const tasks = libraryUrlsToProcess.map((record) => {
			return limit(async () => {
				try {
					const { repoId, ownerId } = extractOwnerAndRepo(record.url);
					const repo = await getRepo(ownerId, repoId);
					const newLib = await convertToLibrary(repo);
					librarySchema.parse(newLib);
					saveLibraryFile(newLib, true);
					return { success: true };
				} catch (error) {
					return { success: false, error };
				}
			});
		});

		const results = await Promise.all(tasks);
		const updatedCount = results.filter((result) => result.success).length;
		const errors = results.filter((result) => !result.success).map((result) => result.error);

		console.log(`Updated ${updatedCount} libraries successfully.`);
		if (errors.length > 0) {
			console.error(`Encountered ${errors.length} errors during the update process.`);
			errors.forEach((error) => {
				console.error(error);
			});
		}
	});

export default command;
