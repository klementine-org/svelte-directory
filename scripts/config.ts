import fs from 'fs';
import path from 'path';

const cwd = process.cwd();
const isRoot = fs.existsSync(path.join(cwd, 'package.json'));
if (!isRoot) {
	console.error('Error: This script must be run from the root directory of the project.');
	console.error('Please navigate to the root directory and try again.');
	process.exit(1);
}

export const DATA_DIR = path.join(cwd, 'data');
export const ASSETS_DIR = path.join(cwd, 'src', 'lib', 'assets');
