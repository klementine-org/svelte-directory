import 'dotenv/config';

import { Command } from 'commander';
import addCommand from './commands/add';
import updateCommand from './commands/update';
import compileCommand from './commands/compile';

const program = new Command()
	.name('svelte-directory')
	.description('CLI tool for managing libraries in the Svelte Directory')
	.version('1.0.0');

program.addCommand(addCommand);
program.addCommand(updateCommand);
program.addCommand(compileCommand);

// Display help if no command is provided
if (process.argv.length === 2) {
	program.help();
}

program.parse();
