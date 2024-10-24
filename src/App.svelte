<script>
	import { onMount } from "svelte";
	import { FalconVis, DuckDB } from "falcon-vis";
	import Histogram from "./lib/Histogram.svelte";
	import ArcData from "./lib/ArcData.svelte";
	import Header from "./lib/Header.svelte";

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

	const numEntries = 12;
	let growingEntries = numEntries;
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

	function fillTable(length, offset) {
		if (entryResolved) {
			entryResolved = false;
			falcon
				.entries({
					length,
					offset,
				})
				.then((d) => {
					entries = d;
					entryResolved = true;
				});
		}
	}
</script>

<Header />
<main style="display: flex; gap: 10px;">
	{#if falcon}
		<div>
			<div>
				Total count: <i style:color="crimson">{totalCountValue}</i>
			</div>
			{#each specs as spec}
				<div>
					<Histogram
						{falcon}
						{spec}
						title={spec.name}
						on:change={() => {
							fillTable(numEntries, 0);
							growingEntries = numEntries;
						}}
					/>
				</div>
			{/each}
			<div>
				<!-- <div>
					<Binary
						{falcon}
						binaryLabels={["Examples", "Test"]}
						spec={{ type: "categorical", name: "evidence_str" }}
					/>
				</div> -->
				<!-- <div style="margin-top: 20px;">
					<Binary
						{falcon}
						binaryLabels={["Train", "Evaluation"]}
						spec={{ type: "categorical", name: "eval_set_str" }}
					/>
				</div> -->
			</div>
		</div>
		<div
			style="display: flex; gap: 10px; flex-wrap: wrap; align-content: flex-start;"
		>
			{#if entries}
				{#each Array.from(entries) as data}
					{#key `${data["id"]}-${data["example"]}`}
						<ArcData {data} {fields} />
					{/key}
				{:else}
					No data
				{/each}
			{/if}
		</div>
	{:else}
		Loading...
	{/if}
</main>
{#if entries}
	<div style="display: flex; justify-content: center;">
		<div>
			<button
				on:click={() => {
					growingEntries += 100;
					fillTable(growingEntries, 0);
				}}>Click to show more</button
			>
		</div>
	</div>
{/if}

<style>
	main {
		padding: 10px;
	}
</style>
