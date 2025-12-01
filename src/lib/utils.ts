import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Converts a date to a relative time string like "2 hours ago" or "3 months ago"
 * @param input - Date, string, or timestamp
 * @param withoutSuffix - If true, returns "2 hours" instead of "2 hours ago"
 */
export function timeAgo(input: Date | string | number, withoutSuffix = false): string {
	return dayjs(input).fromNow(withoutSuffix);
}
