import chalk from 'chalk';

/**
 * Custom logger using chalk for styling and icons for visual cues
 */
export class Logger {
	#scope?: string;

	/**
	 * Create a new Logger instance
	 * @param scope Optional scope prefix for log messages
	 */
	constructor(scope?: string) {
		this.#scope = scope;
	}

	/**
	 * Format the current date and time in a human-readable format
	 * Includes date and time but excludes milliseconds and timezone
	 */
	private getTimestamp(): string {
		const now = new Date();
		const year = now.getFullYear();
		const month = (now.getMonth() + 1).toString().padStart(2, '0');
		const day = now.getDate().toString().padStart(2, '0');
		const hours = now.getHours().toString().padStart(2, '0');
		const minutes = now.getMinutes().toString().padStart(2, '0');
		const seconds = now.getSeconds().toString().padStart(2, '0');
		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	}

	/**
	 * Format a message with optional scope prefix
	 */
	private formatMessage(message: string): string {
		const timestamp = chalk.gray(`[${this.getTimestamp()}]`);
		const scopePrefix = this.#scope ? chalk.cyan(`[${this.#scope}]`) : '';
		return `${timestamp} ${scopePrefix} ${message}`;
	}

	/**
	 * Log an informational message
	 * @param message The message to log
	 */
	info(message: string | object): void {
		const icon = chalk.blue('ℹ');
		if (typeof message === 'object') {
			console.log(this.formatMessage(`${icon} ${chalk.blue('Info')}`));
			console.log(message);
		} else {
			console.log(this.formatMessage(`${icon} ${chalk.blue(message)}`));
		}
	}

	/**
	 * Log a success message
	 * @param message The message to log
	 */
	success(message: string | object): void {
		const icon = chalk.green('✓');
		if (typeof message === 'object') {
			console.log(this.formatMessage(`${icon} ${chalk.green('Success')}`));
			console.log(message);
		} else {
			console.log(this.formatMessage(`${icon} ${chalk.green(message)}`));
		}
	}

	/**
	 * Log a note or informational detail
	 * @param message The message to log
	 */
	note(message: string | object): void {
		const icon = chalk.yellow('●');
		if (typeof message === 'object') {
			console.log(this.formatMessage(`${icon} ${chalk.yellow('Note')}`));
			console.log(message);
		} else {
			console.log(this.formatMessage(`${icon} ${chalk.yellow(message)}`));
		}
	}

	/**
	 * Log a warning message
	 * @param message The message to log
	 */
	warn(message: string | object): void {
		const icon = chalk.yellow('⚠');
		if (typeof message === 'object') {
			console.log(this.formatMessage(`${icon} ${chalk.yellow('Warning')}`));
			console.log(message);
		} else {
			console.log(this.formatMessage(`${icon} ${chalk.yellow(message)}`));
		}
	}

	/**
	 * Log an error message
	 * @param message The message to log
	 */
	error(message: string | object | unknown): void {
		const icon = chalk.red('✗');
		if (typeof message === 'object') {
			console.log(this.formatMessage(`${icon} ${chalk.red('Error')}`));
			console.error(message);
		} else {
			console.log(this.formatMessage(`${icon} ${chalk.red(message)}`));
		}
	}

	/**
	 * Log a pending/awaiting message
	 * @param message The message to log
	 */
	await(message: string | object): void {
		const icon = chalk.blue('⏳');
		if (typeof message === 'object') {
			console.log(this.formatMessage(`${icon} ${chalk.blue('Waiting')}`));
			console.log(message);
		} else {
			console.log(this.formatMessage(`${icon} ${chalk.blue(message)}`));
		}
	}
}
