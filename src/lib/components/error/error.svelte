<script lang="ts">
	import { HomeIcon } from '@lucide/svelte';
	import ErrorStatus from './error-status.svelte';
	import ConfettiButton from './error-confetti-button.svelte';


</script>

<div class="flex flex-col items-center justify-center min-h-screen px-4 py-16 text-center relative overflow-hidden">
	<ErrorStatus />

	<div class="flex flex-col sm:flex-row gap-4">
		<a
			href="/"
			class="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
		>
			<HomeIcon class="mr-2 h-5 w-5" />
			Back to Home
		</a>
		<ConfettiButton />
	</div>
</div>