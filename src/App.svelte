<script>
	import { getContext } from 'svelte'
	import { promise } from './helpers/promise-helpers'
	import { gridSize } from './helpers/monome-helpers'
	import WebMonome from 'webmonome'
	import { version } from '../package.json'
	import { models } from './helpers/model-helpers'
	import { Group as Grp, groups } from './models/group'
	import { Sample as Smpl, samples } from './models/sample'
	import { Pattern as Ptrn, patterns } from './models/pattern'

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
	export let scheduler = {}

	let monome
	const grid = promise()

	async function connect () {
		audioContext.resume()
		try {
			monome = await WebMonome.connect()
			const { x, y } = await gridSize(monome)

			models(4, Grp, groups, { audioContext })
			models(y - 1, Smpl, samples, {
				audioContext,
				group: groups[0],
				stepCount: x,
				bpm,
				scheduler
			})
			models(2, Ptrn, patterns, { bpm, scheduler, router })

			router.start(monome)
			grid.resolve(monome)
		} catch (e) {
			connectError()
		}
	}

	function connectError () {
		alert('could not connect to monome grid. please use a chromium browser and disable serialosc.')
	}
</script>
<header>
	<h1>svemlr v{version}</h1>
</header>

<main>
	{#if !monome}
		<p>Before you start, svemlr requires that <strong>serialosc is disabled</strong>. On macOS open Terminal and execute:</p>
		<pre><code>launchctl unload /Library/LaunchAgents/org.monome.serialosc.plist</code></pre>
		<p>To re-enable: <code>launchctl load /Library/LaunchAgents/org.monome.serialosc.plist</code></p>
		<button on:click={connect}>Connect</button>
	{/if}

	{#await grid.promise then monome}
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
	:global(*) {
		accent-color: orange;
	}

	:global(input[type="checkbox"]) {
		margin: 0;
	}

	h1 {
		font-size: 1rem;
	}

	pre {
		padding: .5rem;
		font-family: 'Oxygen Mono', monospace;
		background-color: whitesmoke;
	}

	pre,
	code {
		background-color: whitesmoke;
	}

	code {
		padding: .25rem;
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
