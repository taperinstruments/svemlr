import * as timers from './timers.js'

export default class Play {
  constructor (sample) {
    this.sample = sample
  }

  get audioContext () {
    return this.sample.audioContext
  }

  start (when, offset = 0, duration) {
    this.elapsed = offset
    this.elapsedCheckedAt = this.audioContext.currentTime
    this.timerId = timers.setInterval(() => {
      this.trackProgress()
    }, 1000 / 60)
  }

  stop () {
    timers.clearInterval(this.timerId)
  }

  trackProgress () {
    const currentTime = this.audioContext.currentTime
    const durationSinceCheck = currentTime - this.elapsedCheckedAt
    this.elapsed += durationSinceCheck * this.sample.speed
    if (this.elapsed > (this.sample.loopStart + this.sample.loopDuration) && this.sample.loop) {
      this.elapsed = this.sample.loopStart + (this.elapsed - (this.sample.loopStart + this.sample.loopDuration))
    }
    this.sample.progress = this.progress
    this.elapsedCheckedAt = currentTime
  }

  get progress () {
    return Math.min(this.elapsed / this.sample.duration, 1)
  }
}
