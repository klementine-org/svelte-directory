import fs from 'fs';
import path from 'path';
import type { Library } from '$lib/types';
import { Logger } from './logger';

const logger = new Logger();

const cwd = process.cwd();
const isRoot = fs.existsSync(path.join(cwd, 'package.json'));
if (!isRoot) {
	logger.error('Error: This script must be run from the root directory of the project.');
	logger.error('Please navigate to the root directory and try again.');
	process.exit(1);
}

export const LIBRARIES_DIR = path.join(cwd, 'data', 'libraries');
export const ASSETS_DIR = path.join(cwd, 'src', 'lib', 'assets');

export function loadLibraries(): Library[] {
	const files = fs.readdirSync(LIBRARIES_DIR).filter((file) => file.endsWith('.json'));

	return files.map((file) => {
		const filePath = path.join(LIBRARIES_DIR, file);
		const content = fs.readFileSync(filePath, 'utf8');
		return JSON.parse(content) as Library;
	});
}

export function saveLibraryFile(library: Library, force = false): string {
	const filePath = path.join(LIBRARIES_DIR, `${library.id}.json`);

	if (fs.existsSync(filePath) && !force) {
		logger.error(`Library file already exists: ${filePath}`);
		logger.error('Use --force option to overwrite the existing file.');
		process.exit(1);
	}

	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, JSON.stringify(library, null, 2), 'utf8');

	return filePath;
}
