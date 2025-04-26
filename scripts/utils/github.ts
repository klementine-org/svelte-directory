import { Octokit } from 'octokit';
import { Logger } from './logger';

const logger = new Logger();
const octokit = new Octokit();

/**
 * Extract owner and repository name from GitHub URL
 * @param githubUrl
 */
export function extractOwnerAndRepo(githubUrl: string) {
	const githubUrlRegex = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/?$/;
	const match = githubUrl.match(githubUrlRegex);

	if (!match) {
		logger.error('Invalid GitHub URL format.');
		logger.note('The URL should be in the format: https://github.com/owner/repo');
		process.exit(1);
	}

	return {
		ownerId: match[1],
		repoId: match[2]
	}
}

/**
 * Fetch repository information from GitHub
 * @param owner
 * @param repo
 */
export async function getRepo(owner: string, repo: string) {
	try {
		// Fetch repository information
		const { data: repoData } = await octokit.rest.repos.get({ owner, repo });

		// Fetch contributors information
		const { data: contributorsData } = await octokit.rest.repos.listContributors({
			owner,
			repo,
			per_page: 5
		});

		// Fetch tags information for version
		const { data: tagsData } = await octokit.rest.repos.listTags({
			owner,
			repo,
			per_page: 1
		});

		return {
			...repoData,
			contributors: contributorsData,
			tags: tagsData
		};
	} catch (error) {
		logger.error('Error fetching repository information:', error);
		process.exit(1);
	}
}

/**
 * Fetch repository information from GitHub using the URL
 * @param githubUrl
 */
export async function getRepoFromUrl(githubUrl: string) {
	const { ownerId, repoId } = extractOwnerAndRepo(githubUrl);
	return await getRepo(ownerId, repoId);
}
