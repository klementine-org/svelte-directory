import path from 'path';
import { DATA_DIR } from '../config';
import fs from 'fs';
import Papa from 'papaparse';
import { type LibraryRecord, libraryRecordSchema } from '../schema';
import type { Library } from '$lib/types';

export function loadLibraryUrls() {
	const csvFilePath = path.join(DATA_DIR, 'libraries.csv');

	// Initialize CSV with headers if it doesn't exist
	if (!fs.existsSync(csvFilePath)) {
		fs.writeFileSync(csvFilePath, 'url,lastChecked\n');
		console.log(`Created new file: ${csvFilePath}`);
	}

	// Read and parse existing CSV
	const csvContent = fs.readFileSync(csvFilePath, 'utf8');
	const { data: libraries } = Papa.parse<LibraryRecord>(csvContent, {
		header: true,
		skipEmptyLines: true
	});

	// Validate libraries
	libraryRecordSchema.array().parse(libraries);

	// Sort by lastChecked date in ascending order, so that the oldest libraries are checked first
	libraries.sort((a, b) => {
		if (!a.lastChecked) {
			return 1; // Treat missing lastChecked as later than any valid date
		}

		if (!b.lastChecked) {
			return -1; // Treat missing lastChecked as later than any valid date
		}

		const dateA = new Date(a.lastChecked);
		const dateB = new Date(b.lastChecked);
		return dateA.getTime() - dateB.getTime();
	});

	return libraries;
}

export function loadLibraries(): Library[] {
	const LIBRARIES_DIR = path.join(DATA_DIR, 'libraries');

	const files = fs.readdirSync(LIBRARIES_DIR).filter((file) => file.endsWith('.json'));

	return files.map((file) => {
		const filePath = path.join(LIBRARIES_DIR, file);
		const content = fs.readFileSync(filePath, 'utf8');
		return JSON.parse(content) as Library;
	});
}

export function saveLibraryFile(library: Library, force = false): string {
	const filePath = path.join(DATA_DIR, 'libraries', `${library.id}.json`);

	if (fs.existsSync(filePath) && !force) {
		console.error(`Library file already exists: ${filePath}`);
		console.error('Use --force option to overwrite the existing file.');
		process.exit(1);
	}

	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, JSON.stringify(library, null, 2), 'utf8');

	return filePath;
}
