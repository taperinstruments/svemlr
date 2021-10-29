<script>
	import { arrayOf, fetchAudioBuffer } from './lib/utils.js'
	import { bpm, quantize, audioContext } from './lib/stores.js'
	import Group from './lib/group.js'
	import Channel from './components/Channel.svelte'
	import Time from './components/Time.svelte'

	let _audioContext
	audioContext.subscribe(ac => _audioContext = ac)

	const groups = arrayOf(4, i => new Group(i, _audioContext))
	const loadBuffer = fetchAudioBuffer('/drums.mp3')

	let channels = arrayOf(7, i => ({ id: i, groupId: 0 }))
</script>

<main>
	<table>
		<thead>
			<th></th>
			<th>Octave</th>
			<th>Speed</th>
			<th></th>
			<th>Group</th>
		</thead>
		<tbody>
			{#await loadBuffer then buffer}
				{#each channels as channel}
					<Channel {groups} {bpm} {buffer} {...channel} />
				{/each}
			{/await}
		</tbody>
	</table>

	<Time {bpm} {quantize} />
</main>
