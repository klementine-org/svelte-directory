<script module lang="ts">
	import type { Component } from 'svelte';
	import { ALargeSmallIcon, ClockIcon, type IconProps, StarIcon } from '@lucide/svelte';
	import { SortKeyEnum } from '$lib/constants';

	interface SortInfo {
		label: string;
		icon: Component<IconProps>;
	}

	// Using a Record with enum SortOption as keys ensures type-safety and completeness of all sort options at compile-time
	const SORT_OPTIONS: Record<SortKeyEnum, SortInfo> = Object.freeze({
		[SortKeyEnum.NAME]: { label: 'Name', icon: ALargeSmallIcon },
		[SortKeyEnum.STARS]: { label: 'Stars', icon: StarIcon },
		[SortKeyEnum.LAST_UPDATED]: { label: 'Last Updated', icon: ClockIcon }
	});

	const sortOptionEntries = Object.entries(SORT_OPTIONS);
</script>

<script lang="ts">
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import { queryParams } from '$lib/hooks/query-params.svelte.js';
</script>

<ToggleGroup.Root
	type="single"
	data-orientation="vertical"
	class="flex-col items-start"
	bind:value={queryParams.sortKey}
>
	{#each sortOptionEntries as [value, { label, icon: Icon }] (value)}
		<ToggleGroup.Item {value} class="w-full justify-start">
			<Icon />
			{label}
		</ToggleGroup.Item>
	{/each}
</ToggleGroup.Root>
