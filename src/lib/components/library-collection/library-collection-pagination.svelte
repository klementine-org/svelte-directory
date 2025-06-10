<script module lang="ts">
	import { queryParam, ssp } from 'sveltekit-search-params';
	import { fromStore } from 'svelte/store';
	import { PAGINATION_DEFAULTS, PaginationParamEnum } from '$lib/constants';

	class PaginationParams {
		#limitStore;
		#skipStore;
		#skip;
		#limit;
		count: number;

		constructor(count: number) {
			this.#limitStore = queryParam(
				PaginationParamEnum.LIMIT,
				ssp.number(PAGINATION_DEFAULTS.limit)
			);
			this.#limit = fromStore(this.#limitStore);

			this.#skipStore = queryParam(PaginationParamEnum.SKIP, ssp.number(PAGINATION_DEFAULTS.skip));
			this.#skip = fromStore(this.#skipStore);

			this.count = count;
		}

		get page() {
			return Math.floor(this.#skip.current / this.#limit.current) + 1;
		}

		set page(value) {
			document.body.scrollIntoView();
			this.#skipStore.set((value - 1) * this.#limit.current);
		}

		get perPage() {
			return this.#limit.current;
		}
	}
</script>

<script>
	import { page } from '$app/state';
	import { Pagination } from 'bits-ui';
	import { ChevronLeftIcon, ChevronRightIcon } from '@lucide/svelte';
	import { cn } from '$lib/utils.js';

	const paginationParams = new PaginationParams(page.data.count);

	// Styling
	const letterClasses =
		'flex flex-col items-stretch justify-center text-3xl font-medium select-none';
	const buttonClasses = cn(
		'inline-flex size-10 items-start pt-px justify-center disabled:invisible cursor-pointer',
		'hover:text-primary hover:scale-[1.05] active:scale-[0.98] transition-all duration-150'
	);
	const paginationClasses =
		'text-muted-foreground cursor-pointer data-selected:cursor-default data-selected:text-primary hover:text-primary disabled:cursor-not-allowed disabled:text-muted-foreground';
	const ellipsisClasses = 'text-muted-foreground cursor-default text-[15px] font-medium';
</script>

<Pagination.Root
	count={paginationParams.count}
	perPage={paginationParams.perPage}
	bind:page={paginationParams.page}
>
	{#snippet children({ pages, range })}
		<div class="my-6 flex items-center">
			<Pagination.PrevButton class={buttonClasses}>
				<ChevronLeftIcon class="size-6" />
			</Pagination.PrevButton>
			<span class="sr-only">
				Showing {range.start} to {range.end} of {page.data.count} results
			</span>
			<div class="flex items-baseline gap-0.5" aria-hidden="true">
				<div class={letterClasses}>S</div>
				<div class={letterClasses}>v</div>
				{#each pages as page (page.key)}
					{#if page.type === 'ellipsis'}
						<div class={ellipsisClasses}>...</div>
					{:else}
						<Pagination.Page
							class={cn(
								letterClasses,
								paginationClasses,
								'data-selected:[&>*:nth-child(2)]:text-foreground data-selected:[&>*:nth-child(2)]:no-underline!'
							)}
							{page}
						>
							<span>e</span>
							<span class="text-sm font-normal text-blue-500 select-text hover:underline"
								>{page.value}</span
							>
						</Pagination.Page>
					{/if}
				{/each}
				<div class={letterClasses}>l</div>
				<div class={letterClasses}>t</div>
				<div class={letterClasses}>e</div>
			</div>
			<Pagination.NextButton class={buttonClasses}>
				<ChevronRightIcon class="size-6" />
			</Pagination.NextButton>
		</div>
	{/snippet}
</Pagination.Root>
