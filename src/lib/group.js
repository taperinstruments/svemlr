import { writable, derived } from 'svelte/store'
import Sample from './sample.js'

export default class Group {
  constructor(id, audioContext, level = 1) {
    this.id = id
    this.audioContext = audioContext
    this.node = audioContext.createGain()
    this.node.connect(audioContext.destination)
    this.level = writable(level)
    this.muted = writable(false)
    this.gain = derived([this.level, this.muted], ([$level, $muted]) => {
      return this.node.gain.value = $muted ? 0 : $level
    })
    this.gain.subscribe(() => {})
    this.active = writable(false)
  }

  play (buffer, options = {}) {
    this.stop()
    const source = this.createBufferSource(buffer)
    const { when, offset, duration, ...sampleOptions } = options
    this.sample = new Sample(source, sampleOptions)
    this.sample.start(when, offset, duration)
    this.active.set(true)
    return this.sample
  }

  stop () {
    this.sample?.stop()
    this.active.set(false)
  }

  createBufferSource (buffer) {
    const source = this.audioContext.createBufferSource()
    source.buffer = buffer
    source.connect(this.node)
    return source
  }
}
