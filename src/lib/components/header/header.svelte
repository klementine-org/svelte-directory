<script>
	import { page } from '$app/state';
	import LightSwitch from './header-light-switch.svelte';
	import RepositoryLink from './header-repository-link.svelte';
	import Search from './header-search.svelte';
	import { SidebarTrigger } from '$lib/components/ui/sidebar/index.js';

	const count = $derived(page.data.count);
</script>

<header class="bg-background sticky top-0 z-10 flex h-24 border-b px-6 pt-4 pb-3">
	<div class="h-full w-12 lg:w-16">
		<SidebarTrigger />
	</div>
	<div class="w-full max-w-4xl space-y-2">
		<div class="flex items-center justify-between gap-6">
			<Search />
			<div class="flex items-center gap-4">
				<RepositoryLink />
				<LightSwitch />
			</div>
		</div>
		<div class="flex items-center justify-between">
			<span class="text-muted-foreground text-sm">
				{count}
				{count === 1 ? 'Library' : 'Libraries'} Found
			</span>
		</div>
	</div>
</header>
