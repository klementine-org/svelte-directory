import { Command } from 'commander';
import { librarySchema } from '$lib/schema';
import { getRepoFromUrl, saveLibraryFile, convertToLibrary, Logger } from '../utils';

const logger = new Logger('add');

const command = new Command('add')
	.description('Add a GitHub repository as a library')
	.argument('<github-url>', 'GitHub repository URL')
	.option('-f, --force', 'Overwrite existing library file')
	.action(async (githubUrl, options) => {
		logger.info(`Adding library from GitHub URL: ${githubUrl}`);
		const repo = await getRepoFromUrl(githubUrl);
		const library = await convertToLibrary(repo);

		try {
			librarySchema.parse(library);
		} catch (validationError) {
			console.error('Validation errors:');
			console.error(validationError);
			process.exit(1);
		}

		const filePath = saveLibraryFile(library, options.force);
		logger.success(`Library entry created and saved to ${filePath}`);
	});

export default command;
