<script lang="ts">
	import { StarIcon } from '@lucide/svelte';
	import type { Library } from '$lib/types';
	import Header from './library-collection-item-header.svelte'
	import TagList from './library-collection-item-tag-list.svelte';

	type Props = { library: Library }

	const { library }: Props = $props();
</script>

{#snippet StarLink()}
	<div class="flex items-center gap-3">
		<a href={library.githubUrl} class="text-primary text-xl max-w-xl hover:underline underline-offset-2 truncate"
			 target="_blank">
			{library.name}
		</a>
		<div class="flex items-center gap-1 text-amber-500">
			<StarIcon class="fill-current size-4" />
			<span class="text-xs text-foreground/80">{library.stars.toLocaleString()}</span>
		</div>
	</div>
{/snippet}

<!-- TODO: once we add preview, we should add 'hover:cursor-pointer'-->
<div class="flex flex-col gap-1">
	<Header {library}/>
	{@render StarLink()}
	<p class="text-sm text-foreground/80 leading-snug line-clamp-3">{library.description}</p>
	<TagList tags={library.topics} />
</div>