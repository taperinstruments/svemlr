<script>;
	import { arrayOf } from '../lib/utils.js'
	export let id
	export let reverse = false

	export let groups
	export let groupId
	$: group = groups[groupId]

	export let buffer

	export let bpm
	export let octave = 0
	export let enabledStepCount = 8
	export let loopStartStep = 0
	export let loopEndStep
	let currentStep
	let stepCount = 16
	$: steps = arrayOf(stepCount, i => ({ enabled: i < enabledStepCount }))
	$: stepDuration = 60 / $bpm
	$: stepsDuration = stepDuration * enabledStepCount
	$: speed = (buffer.duration / stepsDuration) * Math.pow(2, octave)
	$: loopStart = (buffer.duration / enabledStepCount) * loopStartStep
	$: loopEnd = (buffer.duration / enabledStepCount) * (loopEndStep || enabledStepCount)

	let sample
	$: if (sample) {
		sample.speed = speed
		sample.loopStart = loopStart
		sample.loopEnd = loopEnd
	}

	function start (step) {
		sample = group.play(buffer, {
			reverse,
			loop: loopStart != null,
			loopStart,
			loopEnd,
			speed,
			offset: (buffer.duration / enabledStepCount) * step
		})

		sample.addEventListener('progress', () => {
			currentStep = Math.floor(sample.progress * enabledStepCount)
		})
		sample.addEventListener('ended', () => currentStep = null)
	}
</script>

<tr>
	<td>
		<div>
			{#each steps as step, i}
				<input name="channel_{id}_step" type="radio" value={i} disabled={!step.enabled} on:click={({ target }) => start(Number(target.value))} bind:group={currentStep} autocomplete="off">
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
		{#each groups as group}
			<input name="channel_{id}_group" type="radio" value={group.id} bind:group={groupId} autocomplete="off">
		{/each}
	</td>
</tr>

<style>
	[type="range"] {
		margin: 0;
		width: 100%;
	}
</style>
