import WAAClock from 'waaclock'

export default class Clock extends EventTarget {
  constructor(audioContext, bpm) {
    super()
    this.audioContext = audioContext
    this.clock = new WAAClock(audioContext)
    this.bpm = bpm
    this.count = 0
    this.maxCount = 16 * 4 * this.pulsesPerQuarterNote // 16 bars
  }

  start () {
    this.clock.start()
    this.dispatch('tick', { detail: { count: this.count } })
    this.clock.setTimeout(() => {
      const count = ++this.count === this.maxCount ? (this.count = 0) : this.count
      this.dispatch('tick', { detail: { count } })
    }, this.tickDuration).repeat(this.tickDuration)
  }

  set bpm (value) {
    this.clock.timeStretch(this.audioContext.currentTime, [], this.bpm / value)
    this._bpm = value
  }

  get bpm () {
    return this._bpm
  }

  get tickDuration () {
    const quarterNoteDuration = (60 / this.bpm)
    return quarterNoteDuration / this.pulsesPerQuarterNote
  }

  get pulsesPerQuarterNote () {
    return 32
  }

  dispatch (eventName, { detail = {}, bubbles = false, cancelable = false } = {}) {
    const event = new CustomEvent(eventName, { detail, bubbles, cancelable })
    this.dispatchEvent(event)
    return event
  }
}
