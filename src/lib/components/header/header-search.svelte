<script lang="ts">
	import { navigating } from '$app/state';
	import { LoaderCircleIcon, SearchIcon } from '@lucide/svelte';
	import { inputVariants } from '$lib/components/ui/input';
	import { queryParams } from '$lib/hooks/query-params.svelte.js';
</script>
<label
	class={inputVariants({class: "rounded-full"})}>
	{#if navigating.to}
		<LoaderCircleIcon class="size-5 mr-2 animate-spin" />
	{:else}
		<SearchIcon class="size-5 mr-2" />
	{/if}
	<input
		id="search"
		name="search"
		aria-label="Search libraries"
		bind:value={queryParams.search}
		class="w-full border-none bg-transparent focus:outline-none"
		type="search"
		placeholder="Search libraries..."
	/>
</label>