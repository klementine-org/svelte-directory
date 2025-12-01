<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { dev } from '$app/environment';
	import { PUBLIC_ANALYTICS_ID, PUBLIC_ANALYTICS_SCRIPT_URL } from '$env/static/public';

	let { children } = $props();
</script>

<svelte:head>
	<!-- Add analytics	-->
	{#if !dev}
		<script defer src={PUBLIC_ANALYTICS_SCRIPT_URL} data-website-id={PUBLIC_ANALYTICS_ID}></script>
	{/if}
</svelte:head>

<ModeWatcher />
{@render children?.()}
