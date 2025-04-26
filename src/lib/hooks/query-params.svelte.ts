import { queryParam, ssp } from 'sveltekit-search-params';
import { QUERY_DEFAULTS, SortOptionEnum } from '$lib/constants';
import { fromStore } from 'svelte/store';

class QueryParams {
	#searchStore;
	#sortStore;
	#tagsStore;

	constructor() {
		this.#searchStore = queryParam('search', ssp.string(), { debounceHistory: 500 });
		this.#sortStore = queryParam('sort', ssp.string(QUERY_DEFAULTS.sortOption), {
			debounceHistory: 250
		});
		this.#tagsStore = queryParam('tags', ssp.array<string>(), { debounceHistory: 250 });
	}

	get search() {
		return fromStore(this.#searchStore).current;
	}

	set search(v: string | null) {
		this.#searchStore.set(v);
	}

	get sort() {
		return fromStore(this.#sortStore).current;
	}

	set sort(v: string | null) {
		// Value must always be a valid SortOption, so we use a type assertion to prevent deselection
		if (!v) return;
		this.#sortStore.set(v as SortOptionEnum);
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
