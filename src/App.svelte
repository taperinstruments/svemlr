<script>
	import { bpm, quantize } from './lib/stores.js'
	import Channel from './components/Channel.svelte'
	import Time from './components/Time.svelte'

	let channels = Array(7).fill(null).map((_, i) => ({ id: i }))
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
			{#each channels as channel}
				<Channel {bpm} {buffer} {...channel} />
			{/each}
		</tbody>
	</table>

	<Time {bpm} {quantize} />
</main>
