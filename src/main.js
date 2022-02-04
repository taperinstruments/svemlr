import { get } from 'svelte/store'
import App from './App.svelte'
import * as router from './router.js'
import './routes.js'
import { files } from './stores/files'
import { bpm, quantize } from './stores/time'
import { createScheduler } from './stores/scheduler'
import { createGroups } from './stores/group'
import { createSamples } from './stores/sample'

const audioContext = new AudioContext()
const scheduler = createScheduler({
  audioContext,
  bpm: get(bpm),
  quantize: get(quantize)
})
const groups = createGroups(4, audioContext)
const samples = createSamples(7, {
  audioContext,
  group: groups[0],
  bpm,
  quantize,
  scheduler
})

scheduler.start()

const app = new App({
  target: document.getElementById('app'),
  props: {
    router,
    files,
    bpm,
    quantize,
    groups,
    samples
  },
  context: new Map([['audioContext', audioContext]])
})

export default app
