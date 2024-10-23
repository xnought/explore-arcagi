<script>
	import ArcRender from "./ArcRender.svelte";
	import ArcRenderFast from "./ArcRenderFast.svelte";

	export let data;
	export let fields;

	const Render = true ? ArcRenderFast : ArcRender;
</script>

<a href="https://arcprize.org/play?task={data['id']}" target="_blank">
	<div class="outer">
		<div style="display:flex; gap:5px; flex-wrap: wrap;">
			<div>[<b>id</b>: {data["id"]}]</div>
			<div>
				[<b>dataset</b>: {data["eval_set"] ? "eval" : "train"}]
			</div>
			{#if data["evidence"]}
				<div>[<b>example</b>: {data["example"]}]</div>
			{:else}
				<div>[<b>test</b>]</div>
			{/if}
			{#each fields as f}
				<div>[<b>{f}</b>: {data[f].toString().slice(0, 5)}]</div>
			{/each}
		</div>
		<div
			style="display: flex; gap: 5px; align-items: center; margin-top: 5px;"
		>
			<div>
				<Render
					grid={data["input"]}
					rows={Number(data["input_rows"])}
					cols={Number(data["input_cols"])}
				/>
			</div>
			<div>→</div>
			<div>
				<Render
					grid={data["output"]}
					rows={Number(data["output_rows"])}
					cols={Number(data["output_cols"])}
				/>
			</div>
		</div>
	</div>
</a>

<style>
	.outer {
		padding: 10px;
		width: 400px;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 3px;
	}
	a {
		text-decoration: none;
		color: inherit;
		transition: all ease-in-out 200ms;
	}
	a:hover {
		transform: scale(1.02);
	}
</style>
