<script>
	export let id
	export let stepCount = 16
	export let audio
	export let group = 0
	export let octave = 0
	export let reverse = false
	export let duration = 1
	export let active = false
	export let loopStart = 0
	export let loopEnd

	let speed = 1
	let steps = Array(stepCount).fill(false)
	let activeStep
</script>

<tr>
	<td>
		{#each steps as step, i}
			<input name="channel_{id}_step" type="radio" value={i} bind:group={activeStep}>
		{/each}
	</td>
	<td>
		<span>{octave}</span>
		<button on:click={() => --octave} aria-label="Decrement octave">-</button>
		<button on:click={() => ++octave} aria-label="Increment octave">+</button>
	</td>
	<td>
		{speed}
	</td>
	<td>
		<input id="channel_{id}_reverse" type="checkbox" bind:checked={reverse}>
		<label for="channel_{id}_reverse">Rev</label>
	</td>

	<td>
		<input name="channel_{id}_group" type="radio" value={0} bind:group={group}>
		<input name="channel_{id}_group" type="radio" value={1} bind:group={group}>
		<input name="channel_{id}_group" type="radio" value={2} bind:group={group}>
		<input name="channel_{id}_group" type="radio" value={3} bind:group={group}>
	</td>
</tr>
