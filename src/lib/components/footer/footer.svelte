<script lang="ts">
	import { PUBLIC_REPOSITORY_URL } from '$env/static/public';
</script>
<footer class="py-8 px-6 mt-10 border-t border-border/40 text-sm text-muted-foreground">
	<div class="max-w-3xl ml-12 lg:ml-16 pr-6">
		<div class="flex flex-col md:flex-row md:justify-between gap-8 mb-8">
			<div>
				<p class="mb-3 font-semibold text-foreground">Contribute</p>
				<ul class="space-y-2">
					<li>
						<a href="{PUBLIC_REPOSITORY_URL}#add-library"
							 class="hover:text-foreground transition-colors"
							 target="_blank">
							Add a library
						</a>
					</li>
					<li>
						<a href="{PUBLIC_REPOSITORY_URL}/issues/new/choose" class="hover:text-foreground transition-colors"
							 target="_blank">
							Suggest improvements
						</a>
					</li>
				</ul>
			</div>

			<div>
				<p class="mb-3 font-semibold text-foreground">Official Docs</p>
				<ul class="space-y-2">
					<li>
						<a href="https://svelte.dev" class="hover:text-foreground transition-colors">
							Svelte
						</a>
					</li>
					<li>
						<a href="https://svelte.dev/docs/kit/introduction" class="hover:text-foreground transition-colors">
							SvelteKit
						</a>
					</li>
				</ul>
			</div>

			<div class="flex flex-col justify-center">
				<p class="text-sm text-foreground">
					<span>Made with ❤ by</span>
					<br />
					<a href="https://github.com/klementine-org"
						 class="font-medium hover:text-primary transition-colors hover:underline">
						Klementine
					</a>
				</p>
			</div>
		</div>

		<div class="text-xs text-muted-foreground/70 pt-4 border-t border-border/20">
			Inspired by <a href="https://reactnative.directory/" class="hover:text-foreground transition-colors">React
			Native Directory</a> ·
			Community project not affiliated with Svelte
		</div>
	</div>
</footer>