<script lang="ts">
	import _ from 'lodash';
	import { BugIcon, GhostIcon, ServerCrashIcon } from '@lucide/svelte';
	import { page } from '$app/state';

	/**
	 * Get a random error message based on the status code
	 * @param status
	 */
	function getRandomMessage(status: number) {
		const funnyMessages = {
			404: [
				'Oops! This page is playing hide and seek (and winning).',
				'Hmm, this page seems to have gone on vacation.',
				'404: Page not found. It probably went out for coffee.'
			],
			500: [
				'Our servers are having a little dance party right now.',
				'Looks like our hamsters need a break from running the servers.',
				'500: Server error. Have you tried turning it off and on again?'
			],
			other: [
				'Well, this is awkward...',
				'Houston, we have a problem!',
				'Even the best Svelte apps hiccup sometimes.'
			]
		};
		const messages = _.get(funnyMessages, status, funnyMessages.other);
		return _.sample(messages);
	}

	/**
	 * Get the appropriate icon based on the status code
	 * @param status
	 */
	function getErrorIcon(status: number) {
		const statusIcons = {
			404: GhostIcon,
			500: ServerCrashIcon,
			other: BugIcon
		};
		return _.get(statusIcons, status, statusIcons.other);
	}

	const errorMessage = getRandomMessage(page.status);
	const ErrorIcon = getErrorIcon(page.status);
</script>

<div class="relative mb-6">
	<div
		class="from-primary/20 via-primary/10 to-primary/20 absolute -inset-4 animate-pulse rounded-full bg-gradient-to-r"
	></div>
	<ErrorIcon class="text-primary h-32 w-32 animate-bounce" strokeWidth={1.5} />
</div>

<h1
	class="from-primary mb-4 bg-gradient-to-r to-yellow-500 bg-clip-text text-5xl font-bold text-transparent"
>
	{#if page.status === 404}
		Page not found
	{:else if page.status === 500}
		Server error
	{:else}
		Error {page.status}
	{/if}
</h1>

<p class="text-muted-foreground mb-8 max-w-md text-xl">
	{errorMessage}
</p>
