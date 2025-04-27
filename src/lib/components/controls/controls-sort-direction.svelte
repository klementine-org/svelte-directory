<script module lang="ts">
	import type { Component } from 'svelte';
	import { ArrowUpNarrowWideIcon, ArrowDownWideNarrowIcon } from '@lucide/svelte';
	import { SortDirectionEnum } from '$lib/constants';

	interface SortInfo {
		label: string;
		icon: Component;
	}

	const SORT_OPTIONS: Record<SortDirectionEnum, SortInfo> = Object.freeze({
		[SortDirectionEnum.ASC]: { label: 'Ascending', icon: ArrowUpNarrowWideIcon },
		[SortDirectionEnum.DESC]: { label: 'Descending', icon: ArrowDownWideNarrowIcon }
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
	bind:value={queryParams.sortDirection}
>
	{#each sortOptionEntries as [value, { label, icon: Icon }] (value)}
		<ToggleGroup.Item {value} class="w-full justify-start">
			<Icon />
			{label}
		</ToggleGroup.Item>
	{/each}
</ToggleGroup.Root>
