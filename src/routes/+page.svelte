<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { LibraryCollection } from '$lib/components/library-collection';
	import { Controls } from '$lib/components/controls';
	import { Header } from '$lib/components/header';
	import { Footer } from '$lib/components/footer';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
</script>

{#snippet AppSidebar()}
	<Sidebar.Root>
		<Sidebar.Header class="h-24 flex items-start justify-center border-b px-4">
			<!-- This is the logo...yep ^^	-->
			<div class="flex items-center gap-1.5 h-13!">
				<img src="/android-chrome-192x192.png" class="h-13" alt="">
				<div class="flex flex-col -space-y-2 mt-2">
					<span class="text-3xl font-bold uppercase">Svelte</span>
					<span class="text-xl font-bold uppercase tracking-tight">Directory</span>
				</div>
			</div>
		</Sidebar.Header>
		<Sidebar.Content>
			<ScrollArea class="px-2">
				<Controls />
			</ScrollArea>
		</Sidebar.Content>
	</Sidebar.Root>
{/snippet}

<Sidebar.Provider>
	{@render AppSidebar()}
	<div class="flex flex-col w-full">
		<Header />
		<main class="grow px-6 w-full max-w-3xl ml-12 lg:ml-16 pr-6 py-8">
			<LibraryCollection />
		</main>
		<Footer />
	</div>
</Sidebar.Provider>