import WAAClock from 'waaclock'

export function createScheduler({ audioContext, bpm, quantize }) {
  let clock = new WAAClock(audioContext)
  let callbacks = []
  let started = false
  let event

  function start() {
    const interval = tickDuration(bpm, quantize)
    clock.start()
    event = clock.setTimeout(handleTick, interval).repeat(interval)
    started = true
  }

  function stop () {
    if (!started) return

    event.clear()
    event = null
    clock.stop()
    started = false
  }

  function schedule (fn, args) {
    callbacks.push({ fn, args })
  }

  function handleTick () {
    while (callbacks.length) {
      const { fn, args } = callbacks.shift()
      fn.apply(null, args)
    }
  }

  function tickDuration (bpm, quantize) {
    const beatDuration = (60 / bpm) // seconds
    return beatDuration / quantize
  }

  function timeStretch (ratio) {
    if (!started) return
    clock.timeStretch(audioContext.currentTime, [event], ratio)
  }

  return {
    start,
    stop,
    schedule,
    set bpm (newBpm) {
      timeStretch(bpm / newBpm)
      bpm = newBpm
    },
    set quantize (newQuantize) {
      timeStretch(quantize / newQuantize)
      quantize = newQuantize
    }
  }
}
