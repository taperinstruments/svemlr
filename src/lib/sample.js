import Play from './play.js'

export default class Sample extends EventTarget {
  constructor (source, options = {}) {
    super()
    this.source = source
    this.buffer = source.buffer
    if (options.reverse) this.reverse()
    this.detune = options.detune
    this.loop = options.loop
    this.loopStart = options.loopStart
    this.loopEnd = options.loopEnd
    this.speed = options.speed
  }

  set detune (value) {
    if (value != null) this.source.detune.value = value
  }

  set loop (value) {
    if (value) this.source.loop = value
  }

  set loopStart (value) {
    if (value != null) this.source.loopStart = value
  }

  get loopStart () {
    return this.source.loopStart || 0
  }

  set loopEnd (value) {
    if (value) this.source.loopEnd = value
  }

  get loopEnd () {
    return this.source.loopEnd || this.duration
  }

  get loopDuration () {
    return this.loopEnd  - this.loopStart
  }

  get duration () {
    return this.buffer.duration
  }

  get speed () {
    return this.source.playbackRate.value
  }

  set speed (value) {
    if (value) this.source.playbackRate.value = value
  }

  get loop () {
    return this.source.loop
  }

  get audioContext () {
    return this.source.context
  }

  start (when, offset, duration) {
    this.source.start(when, offset, duration)
    this.play = new Play(this)
    this.play.start(when, offset, duration)
    this.source.addEventListener('ended', () => {
      this.play.stop()
      this.dispatch('ended')
    })
  }

  stop () {
    this.source.stop()
  }

  get progress () {
    return this._progress || 0
  }

  set progress (progress) {
    this._progress = progress
    this.dispatch('progress')
  }

  reverse () {
    for (let i = 0; i < this.buffer.numberOfChannels; i++) {
      Array.prototype.reverse.call(this.buffer.getChannelData(i))
    }
  }

  dispatch (eventName, { detail = {}, bubbles = false, cancelable = false } = {}) {
    const event = new CustomEvent(eventName, { detail, bubbles, cancelable })
    this.dispatchEvent(event)
    return event
  }
}
