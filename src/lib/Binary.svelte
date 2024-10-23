<script>
	import { onMount, onDestroy } from "svelte";

	export let binaryLabels = ["FALSE", "TRUE"];
	export let falcon;
	export let spec;

	let state;
	let instance;
	onMount(async () => {
		instance = await falcon.view1D(spec, (s) => (state = s));
		await falcon.link();
	});
	onDestroy(async () => await instance.detach());
</script>

<div
	style="display: flex; gap: 5px;"
	on:mouseenter={async () => {
		// await instance.activate();
	}}
>
	{#if state}
		{#each { length: 2 } as _, i}
			<div
				style="cursor: pointer; outline: 1px solid lightgrey; border-radius: 3px; height: 25px; width: 120px;"
				on:click={async () => {
					if (i === 0) {
						await instance.select("train");
					} else {
						await instance.select("eval");
					}
				}}
			>
				{binaryLabels[i]}: {state.filter[i]}
			</div>
		{/each}
	{/if}
</div>
