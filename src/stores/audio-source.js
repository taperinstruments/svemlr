import { createPlay } from './play'

export function createAudioSource (source, sample) {
  let play
  const { loopStart, loopEnd, loop, speed, progress } = sample
  loopStart.subscribe(value => source.loopStart = value)
  loopEnd.subscribe(value => source.loopEnd = value || undefined)
  loop.subscribe(value => source.loop = value)
  speed.subscribe(value => source.playbackRate.value = value)

  return {
    start: function (when, offset, duration) {
      source.start(when, offset, duration)
      play = createPlay(source, (value) => progress.set(value))
      play.start(offset)
    },

    stop: function () {
      source.stop()
      play.stop()
      sample.stop()
    }
  }
}
