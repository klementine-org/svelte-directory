import Papa from 'papaparse';
import fs from 'fs';
import { Command } from 'commander';
import { loadLibraryUrls } from '../utils';
import path from 'path';
import { DATA_DIR } from '../config';

const csvFilePath = path.join(DATA_DIR, 'libraries.csv');

const command = new Command('add')
	.description('Add a GitHub repository URL to libraries.csv')
	.argument('<libraryUrl>', 'GitHub repository URL to add')
	.action((libraryUrl) => {
		if (!new URL(libraryUrl).hostname.includes('github.com')) {
			console.error('URL must be a GitHub repository URL');
			process.exit(1);
		}

		const libraryUrls = loadLibraryUrls();

		// Check for duplicates
		if (libraryUrls.some((lib) => lib.url.toLowerCase() === libraryUrl.toLowerCase())) {
			console.error(`URL ${libraryUrl} already exists.`);
			process.exit(1);
		}

		// Append new record
		const newRecord = Papa.unparse([{ url: libraryUrl, lastChecked: null }], { header: false });
		fs.appendFileSync(csvFilePath, '\n' + newRecord + '\n');

		console.log(`Successfully added ${libraryUrl} to libraries.csv`);
	});

export default command;
