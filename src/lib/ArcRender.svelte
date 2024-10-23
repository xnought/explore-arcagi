<script>
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
</script>

<svg {width} {height}>
	{#each grid as r, i}
		{#each r as c, j}
			{#if Number(c) !== 0}
				<rect
					fill={colors[Number(c)]}
					width={square}
					height={square}
					x={i * square}
					y={j * square}
				/>
			{/if}
		{/each}
	{/each}
</svg>
