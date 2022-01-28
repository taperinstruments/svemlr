/**
 * @param {AudioBufferSourceNode} source
 * @param {Function} callback
 */
export function createPlay (source, callback) {
  let elapsed
  let elapsedCheckedAt
  let timer
  source.addEventListener('ended', stop)

  function start (offset = 0) {
    elapsed = offset
    callback(progress())
    elapsedCheckedAt = currentTime()
    timer = setInterval(trackProgress, 1000 / 60)
  }

  function stop () {
    clearInterval(timer)
  }

  function trackProgress () {
    const now = currentTime()
    const durationSinceCheck = now - elapsedCheckedAt
    elapsed += durationSinceCheck * speed()
    if (loop() && elapsed > (loopStart() + loopDuration())) {
      elapsed = loopStart() + (elapsed - (loopStart() + loopDuration()))
    }
    callback(progress())
    elapsedCheckedAt = currentTime()
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

  function loopDuration () {
    return loopEnd() - loopStart()
  }

  function loop () {
    return source.loop
  }

  function speed () {
    return source.playbackRate.value
  }

  function progress () {
    return Math.min(elapsed / duration(), 1)
  }

  return { start, stop }
}
