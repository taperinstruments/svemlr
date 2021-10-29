<script>
	export let bpm
	export let quantize

	const quantizeOptions = [128, 64, 32, 16, 8, 4, 2]
	
	function adjustBpm (value) {
		bpm.update(n => n + value)
	}
</script>

<label for="tempo">Tempo</label>
<input type="number" bind:value={$bpm} id="tempo" size="6">
<button on:click={()=> adjustBpm(-4)}>-4</button>
<button on:click={()=> adjustBpm(-1)}>-1</button>
<button on:click={()=> adjustBpm(1)}>+1</button>
<button on:click={()=> adjustBpm(4)}>+4</button>

<label for="quantize">Quantize</label>
<select name="quantize" id="quantize" bind:value={$quantize}>
	{#each quantizeOptions as option}
		<option value="{option}">1/{option}</option>
	{/each}
</select>
