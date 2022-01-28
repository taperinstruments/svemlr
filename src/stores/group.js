import { subscribe } from '../helpers/store-helpers'
import { writable } from 'svelte/store'
import { arrayOf } from '../helpers/array-helpers'
import { createAudioSource } from './audio-source'

export let groups = []

export function createGroups (count, audioContext) {
  return groups = arrayOf(count, i => createGroup({ id: i, audioContext }))
}

export function createGroup ({ id, audioContext }) {
  let audioSource
  const node = audioContext.createGain()
  node.connect(audioContext.destination)

  const active = writable(false)
  const level = writable(1)
  const muted = writable(false)
  subscribe([level, muted], ([$level, $muted]) => {
    node.gain.value = $muted ? 0 : $level
  })

  function play (buffer, offset, sample) {
    stop()
    const source = createBufferSource(buffer)
    audioSource = createAudioSource(source, sample)
    audioSource.start(0, offset)
    active.set(true)
    return audioSource
  }

  function stop () {
    audioSource?.stop()
    active.set(false)
  }

  function createBufferSource (buffer) {
    const source = audioContext.createBufferSource()
    source.buffer = buffer
    source.connect(node)
    return source
  }

  return {
    id,
    level,
    muted,
    active,
    play,
    stop
  }
}
