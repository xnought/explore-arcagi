<script>
	import { onMount } from "svelte";

	export let grid;
	export let rows;
	export let cols;
	export let square = 5;

	const colors = [
		"#000000",
		"#0074D9",
		"#FF4136",
		"#2ECC40",
		"#FFDC00",
		"#AAAAAA",
		"#F012BE",
		"#FF851B",
		"#7FDBFF",
		"#B10DC9",
	]; // https://www.kaggle.com/code/kongkeatfeelfluke/kongkeat-s-arc-prize-notebook#4.Visuallization

	$: width = square * cols;
	$: height = square * rows;

	/** @type{HTMLCanvasElement}*/
	let el;
	let ctx;
	onMount(() => {
		ctx = el.getContext("2d");
		ctx.fillStyle = colors[0];
		ctx.fillRect(0, 0, width, height);
		const g = Array.from(grid);
		for (let i = 0; i < rows; ++i) {
			const v = Array.from(g[i]);
			for (let j = 0; j < cols; ++j) {
				const c = Number(v[j]);
				if (c !== 0) {
					ctx.fillStyle = colors[c];
					ctx.fillRect(j * square, i * square, square, square);
				}
			}
		}
	});
</script>

<div>
	<div style="font-size: 10px;">
		[{rows} x {cols}]
	</div>
	<div>
		<canvas bind:this={el} {width} {height} />
	</div>
</div>
