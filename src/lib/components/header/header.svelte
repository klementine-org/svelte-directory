<script>
	import { page } from '$app/state';
	import LightSwitch from './header-light-switch.svelte';
	import RepositoryLink from './header-repository-link.svelte';
	import Search from './header-search.svelte';
	import { SidebarTrigger } from '$lib/components/ui/sidebar/index.js';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte.js';

	const isMobile = new IsMobile();

	const count = $derived(page.data.count);
</script>

{#snippet Links()}
	<div class="flex items-center gap-4">
		<RepositoryLink />
		<LightSwitch />
	</div>
{/snippet}

{#snippet SearchWithInfo()}
	<div class="max-w-4xl space-y-1 sm:space-y-2">
		<Search />
		<span class="text-muted-foreground text-sm">
			Found <strong>{count}</strong>
			{count === 1 ? 'library' : 'libraries'}.
		</span>
	</div>
{/snippet}

<header class="bg-background sticky top-0 z-10 h-36 border-b px-6 pt-4 pb-3 md:h-24">
	{#if isMobile.current}
		<div class="space-y-4">
			<div class="flex items-center justify-between">
				<div class="h-full">
					<SidebarTrigger />
				</div>
				{@render Links()}
			</div>
			{@render SearchWithInfo()}
		</div>
	{:else}
		<div class="flex items-start gap-6">
			<div class="h-full">
				<SidebarTrigger />
			</div>
			<div class="grow">
				{@render SearchWithInfo()}
			</div>
			{@render Links()}
		</div>
	{/if}
</header>
