import { writable, derived } from 'svelte/store'

export const groups = []

export function Group ({ id, audioContext }) {
  let currentSource
  const node = audioContext.createGain()
  node.connect(audioContext.destination)

  const active = writable(false)
  const level = writable(1)
  const muted = writable(false)
  const gain = derived([level, muted], ([$lvl, $muted]) => $muted ? 0 : $lvl)
  gain.subscribe(value => node.gain.value = value)

  function play (source, offset) {
    stop()
    currentSource = source
    source.connect(node)
    source.start(0, offset)
    active.set(true)
    return source
  }

  function stop () {
    currentSource?.stop()
    active.set(false)
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
