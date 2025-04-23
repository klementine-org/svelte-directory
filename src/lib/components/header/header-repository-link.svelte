<script lang="ts">
	import { mode } from 'mode-watcher';
	import githubMark from '$lib/assets/github-mark.svg';
	import githubMarkWhite from '$lib/assets/github-mark-white.svg';
	import { PUBLIC_REPOSITORY_URL } from '$env/static/public';
</script>

<a href={PUBLIC_REPOSITORY_URL} class="text-muted-foreground hover:text-foreground size-6" target="_blank">
	{#if $mode === "dark"}
		<img src={githubMarkWhite} alt="GitHub" />
	{:else}
		<img src={githubMark} alt="GitHub" />
	{/if}
</a>
