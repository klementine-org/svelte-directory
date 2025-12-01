<script lang="ts">
	import type { Library } from '$lib/types.js';
	import { queryParams } from '$lib/hooks/query-params.svelte.js';
	import { cn } from '$lib/utils.js';

	type Props = {
		tags: Library['tags'];
	};

	// Maximum number of tags shown before collapsing (14 tags)
	// Initial collapsed view shows only 8 tags to ensure expanding reveals enough new content
	// This prevents showing the expand button for just 1-2 hidden tags, which would be poor UX
	const TAGS_COLLAPSE_THRESHOLD = 14;
	const TAGS_COLLAPSED_LIMIT = 8;

	const { tags }: Props = $props();

	let collapsed = $state(tags.length > TAGS_COLLAPSE_THRESHOLD);
	const visibleTags = $derived(collapsed ? tags.slice(0, TAGS_COLLAPSED_LIMIT) : tags);
</script>

<div class="text-muted-foreground flex flex-wrap items-center text-xs">
	{#each visibleTags as tag, index (tag)}
		{@const isActive = queryParams.isActiveTag(tag)}
		<button
			class={cn(
				'cursor-pointer transition-all duration-150',
				isActive ? 'underline' : 'hover:underline'
			)}
			onclick={() => queryParams.toggleTag(tag)}
		>
			{tag}
		</button>
		{#if index < visibleTags.length - 1}
			<span class="mx-1">·</span>
		{/if}
	{/each}
	{#if collapsed}
		<button
			class="text-primary ml-2 cursor-pointer transition-all duration-150 hover:underline"
			onclick={() => (collapsed = false)}
		>
			+{tags.length - TAGS_COLLAPSED_LIMIT} more
		</button>
	{/if}
</div>
