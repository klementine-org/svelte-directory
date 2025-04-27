<script lang="ts">
	import { page } from '$app/state';
	import Item from './library-collection-item.svelte';
	import Pagination from './library-collection-pagination.svelte';

	const libraries = $derived(page.data.libraries);
</script>

{#if libraries.length === 0}
	<div class="p-8 text-center">
		<h3 class="mb-2 text-lg font-medium">No libraries found</h3>
		<p class="text-muted-foreground">Try adjusting your search or filters.</p>
	</div>
{:else}
	<div class="flex h-full flex-col">
		<div class="flex grow flex-col gap-10 pb-8">
			{#each libraries as library (library.id)}
				<Item {library} />
			{/each}
		</div>
		<div class="flex justify-center">
			<Pagination />
		</div>
	</div>
{/if}
