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
		<Sidebar.Header class="flex h-24 items-start justify-center border-b px-4">
			<!-- This is the logo...yep ^^	-->
			<div class="flex h-13! items-center gap-1.5">
				<img src="/android-chrome-192x192.png" class="h-13" alt="" />
				<div class="mt-2 flex flex-col -space-y-2">
					<span class="text-3xl font-bold uppercase">Svelte</span>
					<span class="text-xl font-bold tracking-tight uppercase">Directory</span>
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
	<div class="flex w-full flex-col">
		<Header />
		<main class="ml-12 w-full max-w-3xl grow px-6 py-8 pr-6 lg:ml-16">
			<LibraryCollection />
		</main>
		<Footer />
	</div>
</Sidebar.Provider>
