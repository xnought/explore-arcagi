<script>
	export let data;
	export let fields;
</script>

<a href="https://arcprize.org/play?task={data['id']}" target="_blank">
	<div class="outer">
		<div>[<b>id</b>: {data["id"]}]</div>
		<div style="display:flex; gap:5px; flex-wrap: wrap;">
			{#each fields as f}
				<div>[<b>{f}</b>: {data[f].toString().slice(0, 5)}]</div>
			{/each}
		</div>
	</div>
</a>

<style>
	.outer {
		padding: 10px;
		width: 400px;
		background: rgba(255, 255, 255, 0.05);
		height: 200px;
	}
	a {
		text-decoration: none;
		color: inherit;
		transition: all ease-in-out 200ms;
		outline: 1px solid transparent;
	}
	a:hover {
		transform: scale(1.02);
		outline: 1px solid crimson;
		border-radius: 3px;
	}
</style>
