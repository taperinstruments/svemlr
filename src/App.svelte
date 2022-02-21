<script>
	import { getAllContexts } from 'svelte'
	import { gridSize } from './helpers/monome-helpers'
	import { version } from '../package.json'
	import { Layout } from './models/layout'
	import { groups } from './models/group'
	import { samples } from './models/sample'
	import { patterns } from './models/pattern'

	import Devices from './components/Devices.svelte'
	import Sample from './components/Sample.svelte'
	import Files from './components/Files.svelte'
	import Group from './components/Group.svelte'
	import Time from './components/Time.svelte'
	import Pattern from './components/Pattern.svelte'

	const context = getAllContexts()

	export let router = {}
	export let files = {}
	export let bpm = {}
	export let quantize = {}

	let monome = null
	$: monome && start(monome)

	async function start (monome) {
		context.get('audioContext').resume()
		const { x, y } = await gridSize(monome)
		Layout(x, y, context)
		router.start(monome)
	}
</script>
<header>
	<h1>svemlr v{version}</h1>
</header>

<main>
	{#if monome}
		<section class="samples">
			<table>
				<thead>
					<th>File</th>
					<th></th>
					<th>Octave</th>
					<th>Speed</th>
					<th></th>
					<th>Group</th>
				</thead>
				<tbody>
					{#each $samples as sample (sample)}
						<Sample {sample} groups={$groups} {monome} {files} />
					{/each}
				</tbody>
			</table>

			<Files {files} />
		</section>

		<Time {bpm} {quantize} />

		<fieldset>
			<legend>Patterns</legend>
			{#each $patterns as pattern, i (pattern)}
				<Pattern {pattern} x={i + $groups.length} {monome} />
			{/each}
		</fieldset>

		<fieldset>
			<legend>Groups</legend>
			{#each $groups as group (group)}
				<Group {monome} {group} />
			{/each}
		</fieldset>
	{:else}
		<section>
			<Devices bind:selected={monome}/>
		</section>
	{/if}

</main>

<style>
	:global(*) {
		accent-color: orange;
	}

	:global(input[type="checkbox"]) {
		margin: 0;
	}

	h1 {
		font-size: 1rem;
	}

	fieldset {
		border: 0;
		margin: 0;
		padding: 0;
		margin-top: .5rem;
	}

	legend {
		padding: 0;
		font-weight: 700;
	}

	.samples {
		display: flex;
	}
</style>
