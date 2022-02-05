<script>
	import { getContext } from 'svelte'
	import { fileToAudioBuffer } from '../helpers/audio-helpers'
	import { gridLedRow } from '../helpers/monome-helpers'
	import FileSelect from './FileSelect.svelte'

	const audioContext = getContext('audioContext')

	export let sample = {}
	let {
		id,
		steps,
		enabledStepCount,
		currentStep,
		octave,
		speed,
		reverse,
		buffer,
		group,
		start
	} = sample

	export let groups = []
	$: stepCount = $steps.length

	export let monome = {}
	$: y = id + 1
	$: gridLedRow(monome, y, $steps.map((_, i) => i === $currentStep))

	export let files = {}
	let file
	$: if (file) fileToAudioBuffer(file, audioContext).then(b => $buffer = b)

	function jumpStart (event) {
		event.preventDefault() // do not set currentStep to prevent error
		start(Number(event.target.value))
	}
</script>

<tr>
	<td>
		<FileSelect {files} bind:selected={file} />
	</td>
	<td>
		<div>
			{#each $steps as step, i}
				<input name="sample_{id}_step" type="radio" value={i} disabled={!step.enabled} on:click={jumpStart} bind:group={$currentStep} autocomplete="off">
			{/each}
		</div>
		<input type="range" bind:value={$enabledStepCount} min="1" max={stepCount} step="1" />
	</td>
	<td>
		<span>{$octave}</span>
		<button on:click={() => --$octave} aria-label="Decrement octave">-</button>
		<button on:click={() => ++$octave} aria-label="Increment octave">+</button>
	</td>
	<td>
		{$speed.toFixed(2)}
	</td>
	<td>
		<input id="sample_{id}_reverse" type="checkbox" bind:checked={$reverse}>
		<label for="sample_{id}_reverse">Rev</label>
	</td>

	<td>
		{#each groups as grp}
			<input name="sample_{id}_group" type="radio" value={grp} bind:group={$group} autocomplete="off">
		{/each}
	</td>
</tr>

<style>
	[type="range"] {
		margin: 0;
		width: 100%;
	}
</style>
