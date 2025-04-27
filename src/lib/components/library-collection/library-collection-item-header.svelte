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
			{library.owner} <span class="hidden sm:inline">({authors})</span>
		</div>
		<div class="flex flex-col text-xs sm:flex-row sm:items-center @max-sm:justify-center">
			<div class="text-muted-foreground order-2 whitespace-nowrap sm:order-1">
				Updated {library.lastUpdated}
			</div>
			{#if library.websiteUrl}
				<span class="order-2 mx-2 hidden text-xs sm:inline">·</span>
				<a
					href={library.websiteUrl}
					class="text-muted-foreground hover:text-foreground order-1 inline-flex items-center sm:order-3"
					target="_blank"
				>
					<GlobeIcon size={12} class="mr-1 flex-shrink-0" />
					<span class="w-full truncate text-ellipsis sm:max-w-[150px] md:max-w-xs"
						>{library.websiteUrl}</span
					>
				</a>
			{/if}
		</div>
	</div>
</div>
