<script>
	import { getContext } from 'svelte'
	import { promise } from './helpers/promise-helpers'
	import WebMonome from 'webmonome'
	import Sample from './components/Sample.svelte'
	import Files from './components/Files.svelte'
	import Group from './components/Group.svelte'
	import Time from './components/Time.svelte'
	import Pattern from './components/Pattern.svelte'

	const audioContext = getContext('audioContext')

	export let router = {}
	export let files = {}
	export let bpm = {}
	export let quantize = {}
	export let groups = []
	export let samples = []
	export let patterns = []

	let monome
	const grid = promise()

	async function connect () {
		audioContext.resume()
		monome = await WebMonome.connect()
		router.start(monome)
		grid.resolve(monome)
	}
</script>

<main>
	{#if !monome}
		<button on:click={connect}>Connect</button>
	{/if}

	{#await grid.promise then monome}
		<section class="samples">
			<table>
				<thead>
					<th></th>
					<th></th>
					<th>Octave</th>
					<th>Speed</th>
					<th></th>
					<th>Group</th>
				</thead>
				<tbody>
					{#each samples as sample}
						<Sample {sample} {groups} {monome} {files} />
					{/each}
				</tbody>
			</table>

			<Files {files} />
		</section>

		<Time {bpm} {quantize} />

		<fieldset>
			<legend>Patterns</legend>
			{#each patterns as pattern}
				<Pattern {pattern} {monome} />
			{/each}
		</fieldset>

		<fieldset>
			<legend>Groups</legend>
			{#each groups as group}
				<Group {monome} {group} />
			{/each}
		</fieldset>
	{/await}

</main>

<style>
	:global(input[type="checkbox"]) {
		margin: 0;
	}
	* {
		accent-color: orange;
	}

	fieldset {
		border: 0;
		margin: 0;
		padding: 0;
		margin-top: .5rem;
	}

	legend {
		font-weight: 700;
	}

	.top-row {
		display: flex;
	}
	.samples {
		display: flex;
	}
</style>
