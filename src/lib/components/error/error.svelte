<script lang="ts">
	import { HomeIcon } from '@lucide/svelte';
	import ErrorStatus from './error-status.svelte';
	import ConfettiButton from './error-confetti-button.svelte';
</script>

<div
	class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 text-center"
>
	<ErrorStatus />

	<div class="flex flex-col gap-4 sm:flex-row">
		<a
			href="/"
			class="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-full px-6 py-3 shadow-lg transition-all hover:scale-105"
		>
			<HomeIcon class="mr-2 h-5 w-5" />
			Back to Home
		</a>
		<ConfettiButton />
	</div>
</div>
