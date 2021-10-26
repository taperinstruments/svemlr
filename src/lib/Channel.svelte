<script>
	import { bpm } from './stores.js'
	export let id
	export let audio
	export let audioDuration = 8
	export let group = 0
	export let octave = 0
	export let reverse = false
	export let loopStart = 0
	export let loopEnd

	let stepCount = 16
	let enabledStepCount = 8
	let currentStep
	$: steps = Array(stepCount).fill().map((_, i) => ({ enabled: i < enabledStepCount }))
	$: stepDuration = 60 / $bpm
	$: stepsDuration = stepDuration * enabledStepCount
	$: speed = (audioDuration / stepsDuration) * Math.pow(2, octave)
</script>

<tr>
	<td>
		<div>
			{#each steps as step, i}
				<input name="channel_{id}_step" type="radio" value={i} disabled={!step.enabled} bind:group={currentStep} autocomplete="off">
			{/each}
		</div>
		<input type="range" bind:value={enabledStepCount} min="1" max={stepCount} step="1" />
	</td>
	<td>
		<span>{octave}</span>
		<button on:click={() => --octave} aria-label="Decrement octave">-</button>
		<button on:click={() => ++octave} aria-label="Increment octave">+</button>
	</td>
	<td>
		{speed.toFixed(2)}
	</td>
	<td>
		<input id="channel_{id}_reverse" type="checkbox" bind:checked={reverse}>
		<label for="channel_{id}_reverse">Rev</label>
	</td>

	<td>
		<input name="channel_{id}_group" type="radio" value={0} bind:group={group} autocomplete="off">
		<input name="channel_{id}_group" type="radio" value={1} bind:group={group} autocomplete="off">
		<input name="channel_{id}_group" type="radio" value={2} bind:group={group} autocomplete="off">
		<input name="channel_{id}_group" type="radio" value={3} bind:group={group} autocomplete="off">
	</td>
</tr>

<style>
	[type="range"] {
		margin: 0;
		width: 100%;
	}
</style>
