<script module lang="ts">
	import { queryParams } from '$lib/hooks/query-params.svelte.js';
</script>

<script lang="ts">
	import { page } from '$app/state';
	import { Badge } from '$lib/components/ui/badge';
	import { cn } from '$lib/utils';

	const allTags = $derived(page.data.tags);
</script>

<div class="flex flex-wrap gap-2">
	{#each allTags as tag (tag)}
		{@const isActive = queryParams.isActiveTag(tag.name)}
		<Badge
			onclick={() => queryParams.toggleTag(tag.name)}
			variant={isActive ? 'default' : 'secondary'}
			class={cn(
				'cursor-pointer px-3 py-1.5 transition-all duration-150 select-none',
				!isActive && 'hover:brightness-80'
			)}
		>
			{tag.name} ({tag.count})
		</Badge>
	{/each}
</div>
