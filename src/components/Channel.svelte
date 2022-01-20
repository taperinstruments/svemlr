<script>;
	import { arrayOf, chunk } from '../lib/utils.js'
	export let id
	$: y = id + 1
	export let monome
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
		sample.addEventListener('ended', () => {
			currentStep = null
		})
	}

	$: {
		const steps = arrayOf(enabledStepCount, i => i === currentStep)
		const quads = chunk(steps, 8)
		quads.forEach((quad, i) => monome.gridLedRow(i * 8, y, quad))
	}
	const keyDowns = []
	monome.on('gridKeyDown', (event) => {
		const { x } = event
		if (event.y === y && x < enabledStepCount) {
			keyDowns.push(x)

			if (keyDowns.length === 1) {
				start(x)
				loopStartStep = null
				loopEndStep = null
			} else if (keyDowns.length === 2) {
				const [start, end] = keyDowns.sort((a, b) => a - b)
				loopStartStep = start
				loopEndStep = end + 1
			}
		}
	})
	monome.on('gridKeyUp', (event) => {
		const { x } = event
		if (event.y === y) {
			keyDowns.splice(keyDowns.indexOf(x), 1)
		}
	})
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
