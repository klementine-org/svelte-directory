<script lang="ts">
	import { PartyPopperIcon } from '@lucide/svelte';
	import { Confetti } from 'svelte-confetti';

	const DURATION = 2000;

	let container: HTMLDivElement;
	let particles = $state<{ x: number; y: number }[]>([]);
	let timeout: number;

	async function moveConfetti(event: MouseEvent) {
		const { clientX, clientY } = event;

		const elementY = container.getBoundingClientRect().top;
		const elementX = container.getBoundingClientRect().left;

		const x = clientX - elementX;
		const y = clientY - elementY;

		particles = [...particles, { x, y }];

		clearTimeout(timeout);
		timeout = setTimeout(() => (particles = []), DURATION);
	}
</script>

<div bind:this={container} class="relative">
	<button
		onclick={moveConfetti}
		class="border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 inline-flex items-center justify-center rounded-full border px-6 py-3 shadow-lg transition-all hover:scale-105"
	>
		<PartyPopperIcon class="mr-2 h-5 w-5" />
		Cheer Up!
	</button>
	<div class="absolute top-1/2 left-1/2">
		{#each particles as particle, i (i)}
			<div style="left: {particle.x}px; top: {particle.y}px">
				<Confetti />
			</div>
		{/each}
	</div>
</div>
