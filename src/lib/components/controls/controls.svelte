<script lang="ts">
	import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from '$lib/components/ui/sidebar';
	import SortSelector from './controls-sort-selector.svelte';
	import TagFilter from './controls-tag-filter.svelte';
</script>

<SidebarGroup>
	<SidebarGroupLabel>Sort</SidebarGroupLabel>
	<SidebarGroupContent>
		<SortSelector />
	</SidebarGroupContent>
</SidebarGroup>

<!-- TODO: Add sort direction -->

<SidebarGroup>
	<SidebarGroupLabel>Tags</SidebarGroupLabel>
	<SidebarGroupContent>
		<TagFilter />
	</SidebarGroupContent>
</SidebarGroup>
