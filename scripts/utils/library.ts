import type { Library } from '$lib/types';
import type { getRepo } from './github';

/**
 * Create library ID from owner and repo
 */
export function createLibraryId(owner: string, repo: string) {
	return (owner + '--' + repo).toLowerCase();
}

/**
 * Convert GitHub repository information to a library object
 * @param repo
 */
export async function convertToLibrary(repo: Awaited<ReturnType<typeof getRepo>>) {
	// Convert to avatar image to base64
	const ownerAvatarBase64 = await fetch(repo.owner.avatar_url)
		.then((response) => response.arrayBuffer())
		.then((buffer) => Buffer.from(buffer).toString('base64'));

	// Determine the last updated date:
	// 1. Use the latest release date if available
	// 2. Use the latest commit date if available
	let lastUpdated = repo?.latestReleaseDate || repo.latestCommitDate;

	// Format the date to YYYY-MM-DD
	lastUpdated = lastUpdated.split('T')[0];

	return {
		id: createLibraryId(repo.owner.login, repo.name),
		name: repo.name,
		description: repo.description || `A library called ${repo.name}`,
		owner: repo.owner.login,
		ownerAvatarBase64,
		authors: repo.contributors.map((c) => c.login).filter(Boolean) as string[],
		websiteUrl: repo.homepage || repo.html_url,
		githubUrl: repo.html_url,
		stars: repo.stargazers_count,
		lastUpdated,
		topics: repo.topics || [],
		license: repo.license?.spdx_id || 'Unknown',
		version: repo.tags.length > 0 ? repo.tags[0].name.replace(/^v/, '') : 'unknown'
	} as Library;
}
