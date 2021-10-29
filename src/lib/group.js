import Sample from './sample.js'

export default class Group {
  constructor(id, audioContext, level = 1) {
    this.id = id
    this.audioContext = audioContext
    this.node = audioContext.createGain()
    this.node.connect(audioContext.destination)
    this.level = level
  }

  get level () {
    return this._level
  }

  set level (value) {
    this._level = value
    this.node.gain.value = value
  }

  set muted (value) {
    this._muted = value
    this.node.gain.value = value ? 0 : this._level
  }

  get muted () {
    return this._muted
  }
  play (buffer, options = {}) {
    this.sample?.stop()
    const source = this.createBufferSource(buffer)
    const { when, offset, duration, ...sampleOptions } = options
    this.sample = new Sample(source, sampleOptions)
    this.sample.start(when, offset, duration)
    return this.sample
  }

  createBufferSource (buffer) {
    const source = this.audioContext.createBufferSource()
    source.buffer = buffer
    source.connect(this.node)
    return source
  }
}
