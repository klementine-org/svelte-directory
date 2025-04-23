<script module lang="ts">
	import { queryParams } from '$lib/hooks/query-params.svelte.js';
</script>
<script lang="ts">
	import { page } from '$app/state';
	import { Badge } from '$lib/components/ui/badge';
	import { cn } from '$lib/utils';

	const allTags = $derived(page.data.tags);

	// TODO: tags list should be sorted (and have number, of how many elemnents are assigned to a tag)
	// TODO: tags list should have an expand/collapse button and a simple search bar to find tags
</script>

<div class="flex flex-wrap gap-2">
	{#each allTags as tag (tag)}
		{@const isActive = queryParams.isActiveTag(tag)}
		<Badge
			onclick={() => queryParams.toggleTag(tag)}
			variant={isActive ? "default" : "secondary"}
			class={cn(
						"px-3 py-1.5 cursor-pointer transition-all duration-150 select-none",
						!isActive && "hover:brightness-80"
					)}
		>
			{tag}
		</Badge>
	{/each}
</div>