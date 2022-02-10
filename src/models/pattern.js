import { writable, derived } from 'svelte/store'

export const patterns = []

/**
 * @param {{
 *  id: number,
 *  bpm: import('svelte/store').Writable,
 *  scheduler: object
 *  router: object
 * }} options
 * @returns {object}
 */
export function Pattern ({ id, bpm, scheduler, router }) {
  const recordable = writable(false)
  const playing = writable(false)
  const active = derived([recordable, playing],
    ([$recordable, $playing]) => $recordable || $playing
  )
  const length = writable(8)
  const duration = derived([bpm, length],
    ([$bpm, $length]) => (60 / $bpm) * $length
  )
  let onactivity = () => {}
  let events = []
  let currentPlay = null

  const settings = { recordable, playing, active, length, duration }
  const attrs = {}
  for (const key in settings) {
    settings[key].subscribe(value => attrs[key] = value)
  }

  function toggle () {
    if (attrs.active) {
      recordable.set(false)
      playing.set(false)
      clear()
    } else {
      recordable.set(true)
    }
  }

  function record (event) {
    const { recordable, duration } = attrs
    if (!recordable) return
    if (events.push(Event(event)) === 1) {
      currentPlay = scheduler.schedule(play, null, { in: duration })
    }
  }

  function play () {
    recordable.set(false)
    playing.set(true)
  }

  function Event ({ x, y, state }) {
    const { duration } = attrs
    return scheduler.schedule(() => {
      router.handle({ x, y, state, source: 'pattern' })
      scheduler.schedule(onactivity)
    }, null, { in: duration, repeat: duration })
  }

  function stop () {
    currentPlay?.clear()
    currentPlay = null
    playing.set(false)
  }

  function clear () {
    events.forEach(event => event.clear())
    events = []
    stop()
  }

  return {
    id,
    toggle,
    record,
    recordable,
    playing,
    active,
    length,
    set onactivity (fn) {
      onactivity = fn
    }
  }
}
