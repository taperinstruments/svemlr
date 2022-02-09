<script>
	import { getContext } from 'svelte'
	import { promise } from './helpers/promise-helpers'
	import WebMonome from 'webmonome'
	import Sample from './components/Sample.svelte'
	import Files from './components/Files.svelte'
	import GroupActive from './components/GroupActive.svelte'
	import Time from './components/Time.svelte'
	import Strip from './components/Strip.svelte'
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
		<div class="top-row">
			<fieldset>
				<legend>groups</legend>
				{#each groups as group}
					<GroupActive {monome} {group} />
				{/each}
			</fieldset>

			<fieldset>
				<legend>patterns</legend>
				{#each patterns as pattern}
					<Pattern {pattern} {monome} />
				{/each}
			</fieldset>
		</div>

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

		{#each groups as { level, muted }}
			<Strip {level} {muted} />
		{/each}
	{/await}
</main>

<style>
	* {
		accent-color: orange;
	}
	.samples {
		display: flex;
	}
</style>
