<script lang="ts">
	import { navigating } from '$app/state';
	import { LoaderCircleIcon, SearchIcon } from '@lucide/svelte';
	import { inputVariants } from '$lib/components/ui/input';
	import { queryParams } from '$lib/hooks/query-params.svelte.js';
	import { useThrottle } from 'runed';
	import { onMount } from 'svelte';

	let search = $state('');
	const throttledUpdate = useThrottle(() => {
		queryParams.search = search || null;
	}, 500);

	onMount(() => {
		// Initialize search from query params on mount
		search = queryParams.search || '';
	});
</script>

<label class={inputVariants({ class: 'rounded-full' })}>
	{#if navigating.to}
		<LoaderCircleIcon class="mr-2 size-5 animate-spin" />
	{:else}
		<SearchIcon class="mr-2 size-5" />
	{/if}
	<input
		id="search"
		name="search"
		aria-label="Search libraries"
		bind:value={
			() => search,
			(v) => {
				search = v;
				throttledUpdate();
			}
		}
		class="w-full border-none bg-transparent focus:outline-none"
		type="search"
		placeholder="Search libraries..."
	/>
</label>
