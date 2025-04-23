<script lang="ts">
	import { GlobeIcon, PackageIcon } from '@lucide/svelte';
	import * as Avatar from "$lib/components/ui/avatar";
	import type { Library } from '$lib/types';

	type Props = {
		library: Library;
	}

	const { library }: Props = $props();

	const authors = $derived.by(() => {
		if (library.authors.length > 3) {
			return library.authors.slice(0, 3).join(', ') + ' and more';
		} else {
			return library.authors.join(', ');
		}
	});
</script>

<div class="flex items-center gap-3">
	<div class="flex items-center justify-center size-8 bg-muted rounded-full">
		<Avatar.Root>
			<Avatar.Image src="data:image/png;base64,{library.orgAvatarBase64}" alt="Organization Avatar" />
			<Avatar.Fallback>
				<PackageIcon class="size-4 text-muted-foreground" />
			</Avatar.Fallback>
		</Avatar.Root>
	</div>
	<div>
		<div class="text-foreground/80 text-sm truncate">
			{library.org} ({authors})
		</div>
		<div class="flex text-xs items-center">
			<div class="text-muted-foreground whitespace-nowrap">
				Updated {library.lastUpdated}
			</div>
			{#if library.websiteUrl}
				<span class="mx-2 text-xs">·</span>
				<a href={library.websiteUrl} class="inline-flex text-muted-foreground hover:text-foreground items-center"
					 target="_blank">
					<GlobeIcon size={12} class="mr-1 flex-shrink-0" />
					<span class="truncate text-ellipsis max-w-xs">{library.websiteUrl}</span>
				</a>
			{/if}
		</div>
	</div>
</div>