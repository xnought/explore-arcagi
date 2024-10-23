<script>
	import { onMount } from "svelte";
	import { FalconVis, DuckDB } from "falcon-vis";
	import Histogram from "./lib/Histogram.svelte";
	import ArcData from "./lib/ArcData.svelte";

	let falcon;
	let totalCountValue = undefined;
	let entries;
	let entryResolved = false;

	onMount(async () => {
		const db = await DuckDB.fromParquetFile("/metrics_small.parquet");
		falcon = new FalconVis(db);
		await falcon.view0D((d) => (totalCountValue = d.filter));
		entries = await falcon.entries({ offset: 0, length: numEntries });
		entryResolved = true;
	});

	const numEntries = 50;
	const resolution = 300;
	const bins = 20;
	const fields = [
		"input_squares",
		"output_squares",
		"input_entropy",
		"output_entropy",
		"input_gzip",
		"output_gzip",
	];
	const specs = fields.map((d) => ({
		type: "continuous",
		name: d,
		resolution,
		bins,
	}));
</script>

<main style="display: flex; gap: 10px;">
	{#if falcon}
		<div>
			{#each specs as spec}
				<div>
					<Histogram
						{falcon}
						{spec}
						title={spec.name}
						on:change={async () => {
							if (entryResolved) {
								entryResolved = false;
								falcon
									.entries({
										length: numEntries,
										offset: 0,
									})
									.then((d) => {
										entries = d;
										entryResolved = true;
									});
							}
						}}
					/>
				</div>
			{/each}
			<div>
				Total count: <i style:color="crimson">{totalCountValue}</i>
			</div>
		</div>
		<div
			style="display: flex; gap: 10px; flex-wrap: wrap; align-content: flex-start;"
		>
			{#if entries}
				{#each Array.from(entries) as data}
					<ArcData {data} {fields} />
				{:else}
					No data
				{/each}
			{/if}
		</div>
	{/if}
</main>

<style>
	main {
		padding: 10px;
	}
</style>
