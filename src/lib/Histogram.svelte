<script>
	import VLContinuous from "./VLContinuous.svelte";
	import { createEventDispatcher, onDestroy, onMount } from "svelte";
	const dispatch = createEventDispatcher();

	export let falcon;
	export let spec;
	export let title = "";
	export let width = 350;
	export let height = 100;
	export let countLabel = "Count";
	export let dimLabel = "";
	export let onlyFiltered = false;
	export let type = "quantitative";
	export let timeUnit = "";

	let instance;
	let state;
	onMount(async () => {
		instance = await falcon.view1D(spec, (s) => (state = s));
		await falcon.link();
	});
	onDestroy(async () => await instance.detach());

	function convertFormat(state) {
		let newBins = [];
		if (state) {
			for (let i = 0; i < state.bin.length; i++) {
				newBins.push({
					bin: [state.bin[i].binStart, state.bin[i].binEnd],
					count: state.total[i],
					filteredCount: state.filter[i],
				});
			}
		}
		return newBins;
	}

	$: data = convertFormat(state);
</script>

<VLContinuous
	bins={data}
	on:select={async (e) => {
		if (e.detail) {
			instance.select(e.detail);
		} else {
			instance.select();
		}
		dispatch("change", true);
	}}
	on:mouseenter={async () => {
		await instance.activate();
		console.log("activated", spec.name);
	}}
	on:mouseleave
	on:mouseup
	on:mousedown
	on:click
	{timeUnit}
	{type}
	{title}
	{width}
	{height}
	{countLabel}
	{dimLabel}
	{onlyFiltered}
/>
