import Sample from './sample.js'

export default class Group {
  constructor(id, audioContext) {
    this.id = id
    this.audioContext = audioContext
    this.node = audioContext.createGain()
    this.node.connect(audioContext.destination)
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
