import { audioContext } from './stores.js'

export function arrayOf (count, item) {
	const array = []
	for (let index = 0; index < count; index++) {
		array[index] = typeof item === 'function' ? item(index) : item
	}
	return array
}

let $audioContext
audioContext.subscribe(ac => $audioContext = ac)

export async function fetchAudioBuffer (filepath) {
	const response = await fetch(filepath)
	const arrayBuffer = await response.arrayBuffer()
	return $audioContext.decodeAudioData(arrayBuffer)
}

export function playBuffer (buffer, node, options = {}) {
	const source = $audioContext.createBufferSource()
	source.buffer = buffer
	source.connect(node)
	source.detune = options.detune
	source.loop = options.loop
	source.loopStart = options.loopStart
	source.loopEnd = options.loopEnd
	source.playbackRate = options.playbackRate
	source.start()
}
