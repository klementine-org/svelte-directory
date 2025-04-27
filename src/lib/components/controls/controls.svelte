<script lang="ts">
	import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from '$lib/components/ui/sidebar';
	import SortDirection from './controls-sort-direction.svelte';
	import SortSelector from './controls-sort-selector.svelte';
	import TagFilter from './controls-tag-filter.svelte';
</script>

<div class="mb-12!">
	<SidebarGroup>
		<SidebarGroupLabel>Sort</SidebarGroupLabel>
		<SidebarGroupContent>
			<SortSelector />
		</SidebarGroupContent>
	</SidebarGroup>

	<SidebarGroup>
		<SidebarGroupLabel>Sort Direction</SidebarGroupLabel>
		<SidebarGroupContent>
			<SortDirection />
		</SidebarGroupContent>
	</SidebarGroup>

	<SidebarGroup>
		<SidebarGroupLabel>Tags</SidebarGroupLabel>
		<SidebarGroupContent>
			<TagFilter />
		</SidebarGroupContent>
	</SidebarGroup>
</div>
