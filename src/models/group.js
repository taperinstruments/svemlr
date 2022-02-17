import { writable, derived, get } from 'svelte/store'

export const groups = []

export function Group ({ id, audioContext }) {
  let currentSource
  const node = audioContext.createGain()
  node.connect(audioContext.destination)

  const active = writable(false)
  const level = writable(1)
  const muted = writable(false)
  const gain = derived([level, muted], ([$lvl, $muted]) => $muted ? 0 : $lvl)
  gain.subscribe(
    value => node.gain.setTargetAtTime(value, audioContext.currentTime, 0.015)
  )

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

  function toggleMute () {
    muted.set(!get(muted))
  }

  const LEVEL_TRANSITION = 1000 // time (in ms) to go from 0 -> 1
  const LEVEL_INTERVAL = 1000 / 25 // 25fps
  const LEVEL_INCREMENT = 1 / (LEVEL_TRANSITION / LEVEL_INTERVAL)
  let timer

  function startIncreasingLevel () {
    timer = ramp(level, LEVEL_INCREMENT, LEVEL_INTERVAL)
  }

  function startDecreasingLevel () {
    timer = ramp(level, -LEVEL_INCREMENT, LEVEL_INTERVAL)
  }

  function ramp (store, amount, every) {
    let value = get(store)
    return setInterval(function () {
      value = Math.max(0, Math.min(value + amount, 1))
      store.set(value)
    }, every)
  }

  function stopChangingLevel () {
    clearInterval(timer)
  }

  return {
    id,
    level,
    muted,
    active,
    play,
    stop,
    toggleMute,
    startIncreasingLevel,
    startDecreasingLevel,
    stopIncreasingLevel: stopChangingLevel,
    stopDecreasingLevel: stopChangingLevel
  }
}
