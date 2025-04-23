<script module lang="ts">
	import type { Component } from 'svelte';
	import { ArrowDownAzIcon, ClockIcon, type IconProps, StarIcon } from '@lucide/svelte';
	import { SortOptionEnum } from '$lib/constants';

	interface SortInfo {
		label: string;
		icon: Component<IconProps>;
	}

	// Using a Record with enum SortOption as keys ensures type-safety and completeness of all sort options at compile-time
	const SORT_OPTIONS: Record<SortOptionEnum, SortInfo> = Object.freeze({
		[SortOptionEnum.NAME]: { label: 'Name', icon: ArrowDownAzIcon },
		[SortOptionEnum.STARS]: { label: 'Stars', icon: StarIcon },
		[SortOptionEnum.LAST_UPDATED]: { label: 'Last Updated', icon: ClockIcon }
	});

	const sortOptionEntries = Object.entries(SORT_OPTIONS);
</script>
<script lang="ts">
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import { queryParams } from '$lib/hooks/query-params.svelte.js';
</script>

<ToggleGroup.Root type="single" data-orientation="vertical" class="flex-col items-start" bind:value={queryParams.sort}>
	{#each sortOptionEntries as [value, { label, icon: Icon }] (value)}
		<ToggleGroup.Item value={value} class="justify-start w-full">
			<Icon />
			{label}
		</ToggleGroup.Item>
	{/each}
</ToggleGroup.Root>