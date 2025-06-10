import { Octokit } from 'octokit';

const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN
});

/**
 * Extract owner and repository name from GitHub URL
 * @param githubUrl
 */
export function extractOwnerAndRepo(githubUrl: string) {
	const githubUrlRegex = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/?$/;
	const match = githubUrl.match(githubUrlRegex);

	if (!match) {
		console.error('Invalid GitHub URL format.');
		console.error('The URL should be in the format: https://github.com/owner/repo');
		process.exit(1);
	}

	return {
		ownerId: match[1],
		repoId: match[2]
	};
}

/**
 * Fetch repository information from GitHub
 * @param owner
 * @param repo
 */
export async function getRepo(owner: string, repo: string) {
	// Fetch repository information
	const { data: repoData } = await octokit.rest.repos.get({ owner, repo });

	// Fetch contributors information
	const { data: contributorsData } = await octokit.rest.repos.listContributors({
		owner,
		repo,
		per_page: 5
	});

	// Fetch latest release to get release date
	let latestReleaseDate = null;
	try {
		const { data: releaseData } = await octokit.rest.repos.getLatestRelease({
			owner,
			repo
		});
		latestReleaseDate = releaseData.published_at;
	} catch {
		console.error(`No releases found for ${owner}/${repo} or error fetching releases.`);
	}

	let latestCommitDate = null;
	const { data: commitsData } = await octokit.rest.repos.listCommits({
		owner,
		repo,
		per_page: 1
	});

	latestCommitDate = commitsData[0].commit.committer?.date || commitsData[0].commit.author?.date;
	if (!latestCommitDate) {
		console.error('No releases found for commits.');
		process.exit(1);
	}

	// Fetch tags information for version
	const { data: tagsData } = await octokit.rest.repos.listTags({
		owner,
		repo,
		per_page: 1
	});

	return {
		...repoData,
		contributors: contributorsData,
		latestReleaseDate,
		latestCommitDate,
		tags: tagsData
	};
}

/**
 * Fetch repository information from GitHub using the URL
 * @param githubUrl
 */
export async function getRepoFromUrl(githubUrl: string) {
	const { ownerId, repoId } = extractOwnerAndRepo(githubUrl);
	return await getRepo(ownerId, repoId);
}
