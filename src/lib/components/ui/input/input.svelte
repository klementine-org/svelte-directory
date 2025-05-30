<script lang="ts" module>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';

	export const inputVariants = tv({
		base: 'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:outline-none',
		variants: {
			variant: {
				file: 'file:border-0 file:bg-transparent file:text-sm file:font-medium'
			}
		},
		defaultVariants: {
			variant: undefined
		}
	});

	export type InputVariant = VariantProps<typeof inputVariants>['variant'];

	type InputType = Exclude<HTMLInputTypeAttribute, 'file'>;

	export type InputProps = WithElementRef<
		Omit<HTMLInputAttributes, 'type'> &
			({ type: 'file'; files?: FileList } | { type?: InputType; files?: undefined })
	>;
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		files = $bindable(),
		class: className,
		...restProps
	}: InputProps = $props();
</script>

{#if type === 'file'}
	<input
		bind:this={ref}
		class={cn(inputVariants({ variant: 'file' }), className)}
		type="file"
		bind:files
		bind:value
		{...restProps}
	/>
{:else}
	<input bind:this={ref} class={cn(inputVariants(), className)} {type} bind:value {...restProps} />
{/if}
