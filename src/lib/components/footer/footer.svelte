<script lang="ts">
	import { PUBLIC_REPOSITORY_URL } from '$env/static/public';
</script>

<footer class="border-border/40 text-muted-foreground mt-10 border-t px-6 py-8 text-sm">
	<div class="ml-12 max-w-3xl pr-6 lg:ml-16">
		<div class="mb-8 flex flex-col gap-8 md:flex-row md:justify-between">
			<div>
				<p class="text-foreground mb-3 font-semibold">Contribute</p>
				<ul class="space-y-2">
					<li>
						<a
							href="{PUBLIC_REPOSITORY_URL}#add-library"
							class="hover:text-foreground transition-colors"
							target="_blank"
						>
							Add a library
						</a>
					</li>
					<li>
						<a
							href="{PUBLIC_REPOSITORY_URL}/issues/new/choose"
							class="hover:text-foreground transition-colors"
							target="_blank"
						>
							Suggest improvements
						</a>
					</li>
				</ul>
			</div>

			<div>
				<p class="text-foreground mb-3 font-semibold">Official Docs</p>
				<ul class="space-y-2">
					<li>
						<a href="https://svelte.dev" class="hover:text-foreground transition-colors">
							Svelte
						</a>
					</li>
					<li>
						<a
							href="https://svelte.dev/docs/kit/introduction"
							class="hover:text-foreground transition-colors"
						>
							SvelteKit
						</a>
					</li>
				</ul>
			</div>

			<div class="flex flex-col justify-center">
				<p class="text-foreground text-sm">
					<span>Made with ❤ by</span>
					<br />
					<a
						href="https://github.com/klementine-org"
						class="hover:text-primary font-medium transition-colors hover:underline"
					>
						Klementine
					</a>
				</p>
			</div>
		</div>

		<div class="text-muted-foreground/70 border-border/20 border-t pt-4 text-xs">
			Inspired by <a
				href="https://reactnative.directory/"
				class="hover:text-foreground transition-colors">React Native Directory</a
			> · Community project not affiliated with Svelte
		</div>
	</div>
</footer>
