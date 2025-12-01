<script lang="ts">
	import { StarIcon } from '@lucide/svelte';
	import type { Library } from '$lib/types';
	import Header from './library-collection-item-header.svelte';
	import TagList from './library-collection-item-tag-list.svelte';

	type Props = { library: Library };

	const { library }: Props = $props();
</script>

{#snippet StarLink()}
	<div class="flex items-center gap-3">
		<a
			href={library.githubUrl}
			class="text-primary max-w-xl truncate text-xl underline-offset-2 hover:underline"
			target="_blank"
		>
			{library.name}
		</a>
		<div class="flex items-center gap-1 text-amber-500">
			<StarIcon class="size-4 fill-current" />
			<span class="text-foreground/80 text-xs">{library.stars.toLocaleString()}</span>
		</div>
	</div>
{/snippet}

<!-- TODO: once we add preview, we should add 'hover:cursor-pointer'-->
<div class="flex flex-col gap-1">
	<Header {library} />
	{@render StarLink()}
	<p class="text-foreground/80 line-clamp-3 text-sm leading-snug">{library.description}</p>
	<TagList tags={library.tags} />
</div>
