<script lang="ts">
	import { GlobeIcon, PackageIcon } from '@lucide/svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import type { Library } from '$lib/types';

	type Props = {
		library: Library;
	};

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
	<div class="bg-muted flex size-8 items-center justify-center rounded-full">
		<Avatar.Root>
			<Avatar.Image
				src="data:image/png;base64,{library.ownerAvatarBase64}"
				alt="Organization Avatar"
			/>
			<Avatar.Fallback>
				<PackageIcon class="text-muted-foreground size-4" />
			</Avatar.Fallback>
		</Avatar.Root>
	</div>
	<div>
		<div class="text-foreground/80 truncate text-sm">
			{library.owner} ({authors})
		</div>
		<div class="flex items-center text-xs">
			<div class="text-muted-foreground whitespace-nowrap">
				Updated {library.lastUpdated}
			</div>
			{#if library.websiteUrl}
				<span class="mx-2 text-xs">·</span>
				<a
					href={library.websiteUrl}
					class="text-muted-foreground hover:text-foreground inline-flex items-center"
					target="_blank"
				>
					<GlobeIcon size={12} class="mr-1 flex-shrink-0" />
					<span class="max-w-xs truncate text-ellipsis">{library.websiteUrl}</span>
				</a>
			{/if}
		</div>
	</div>
</div>
