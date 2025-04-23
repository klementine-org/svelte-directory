export type Library = {
	id: string;
	name: string;
	description: string;
	org: string;
	orgAvatarBase64?: string;
	authors: string[];
	websiteUrl: string;
	githubUrl: string;
	stars: number;
	lastUpdated: string;
	tags: string[];
	license: string;
	version: string;
}