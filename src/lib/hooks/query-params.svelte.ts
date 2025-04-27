import { queryParam, ssp } from 'sveltekit-search-params';
import { QUERY_DEFAULTS, QueryParamEnum } from '$lib/constants';
import { fromStore } from 'svelte/store';

class QueryParams {
	#searchStore;
	#sortKeyStore;
	#sortDirectionStore;
	#tagsStore;

	constructor() {
		this.#searchStore = queryParam(QueryParamEnum.SEARCH, ssp.string(), { debounceHistory: 500 });
		this.#sortKeyStore = queryParam(
			QueryParamEnum.SORT_KEY,
			ssp.string(QUERY_DEFAULTS[QueryParamEnum.SORT_KEY]),
			{
				debounceHistory: 250
			}
		);
		this.#sortDirectionStore = queryParam(
			QueryParamEnum.SORT_DIRECTION,
			ssp.string(QUERY_DEFAULTS[QueryParamEnum.SORT_DIRECTION]),
			{
				debounceHistory: 250
			}
		);
		this.#tagsStore = queryParam(QueryParamEnum.TAGS, ssp.array<string>(), {
			debounceHistory: 250
		});
	}

	get search() {
		return fromStore(this.#searchStore).current;
	}

	set search(v: string | null) {
		this.#searchStore.set(v);
	}

	get sortKey() {
		return fromStore(this.#sortKeyStore).current;
	}

	set sortKey(v: string | undefined) {
		// Value must always be a valid SortOption, so we use a type assertion to prevent deselection
		if (!v) return;
		this.#sortKeyStore.set(v);
	}

	get sortDirection() {
		return fromStore(this.#sortDirectionStore).current;
	}

	set sortDirection(v: string | undefined) {
		if (!v) return;
		this.#sortDirectionStore.set(v);
	}

	get tags() {
		return fromStore(this.#tagsStore).current;
	}

	isActiveTag(tag: string) {
		return this.tags?.includes(tag);
	}

	toggleTag(tag: string) {
		if (this.tags?.includes(tag)) {
			this.#tagsStore.update((tags) => tags && tags.filter((t) => t !== tag));
		} else {
			this.#tagsStore.update((tags) => (tags ? [...tags, tag] : [tag]));
		}
	}
}

export const queryParams = new QueryParams();
