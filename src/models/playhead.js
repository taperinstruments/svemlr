/**
 * @param {AudioBufferSourceNode} source
 * @param {Function} callback
 */
export function Playhead (source, callback) {
  let elapsed
  let elapsedCheckedAt
  let timer
  source.addEventListener('ended', stop)

  function start (offset = 0) {
    elapsed = offset
    callback(progress())
    elapsedCheckedAt = currentTime()
    timer = setInterval(check, 1000 / 60)
  }

  function stop () {
    clearInterval(timer)
  }

  function check () {
    const now = currentTime()
    const durationSinceCheck = now - elapsedCheckedAt
    elapsed += durationSinceCheck * speed()

    if (loop() && elapsed > loopEnd()) {
      elapsed = loopStart() + (elapsed - loopEnd())
    }
    callback(progress())
    elapsedCheckedAt = now
  }

  function currentTime () {
    return +new Date() / 1000 // seconds
  }

  function duration () {
    return source.buffer.duration
  }

  function loopStart () {
    return source.loopStart || 0
  }

  function loopEnd () {
    return source.loopEnd || duration()
  }

  function loop () {
    return source.loop
  }

  function speed () {
    return source.playbackRate.value
  }

  function progress () {
    // use -Number.MIN_VALUE to prevent progress spilling over
    return Math.min((elapsed / duration()) - Number.MIN_VALUE, 1)
  }

  return { start, stop, check }
}
