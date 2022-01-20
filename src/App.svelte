<script>
	import { arrayOf, fetchAudioBuffer } from './lib/utils.js'
	import { bpm, quantize, audioContext } from './lib/stores.js'
	import WebMonome from 'webmonome'
	import Clock from './lib/clock.js'
	import Group from './lib/group.js'
	import GroupActive from './components/GroupActive.svelte'
	import Channel from './components/Channel.svelte'
	import Time from './components/Time.svelte'
	import Strip from './components/Strip.svelte'

	let _audioContext
	audioContext.subscribe(ac => _audioContext = ac)

	const clock = new Clock(_audioContext, $bpm)
	let time = +new Date()
	clock.addEventListener('tick', ({ detail: { count } }) => {
		time = +new Date()
	})

	const groups = arrayOf(4, i => new Group(i, _audioContext))

	let channels = arrayOf(7, i => ({ id: i, groupId: 0 }))

	let monome
	let resolveConnectMonome
	const connectMonome = new Promise(resolve => resolveConnectMonome = resolve)
	async function connect () {
		_audioContext.resume()
		clock.start()
		monome = await WebMonome.connect()
		resolveConnectMonome(monome)
	}

	function setup () {
		return Promise.all([
			fetchAudioBuffer('/drums.mp3'),
			connectMonome
		])
	}
</script>

<main>
	{#if !monome}
		<button on:click={connect}>Connect</button>
	{/if}
	{#await setup() then [buffer, monome]}
		{#each groups as group}
			<GroupActive {monome} {group} />
		{/each}

		<table>
			<thead>
				<th></th>
				<th>Octave</th>
				<th>Speed</th>
				<th></th>
				<th>Group</th>
			</thead>
			<tbody>
					{#each channels as channel}
						<Channel {monome} {groups} {bpm} {buffer} {...channel} />
					{/each}
			</tbody>
		</table>

		<Time {bpm} {quantize} />

		{#each groups as { level, muted }}
			<Strip {level} {muted} />
		{/each}
	{/await}
</main>
