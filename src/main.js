import { get } from 'svelte/store'
import { models } from './helpers/model-helpers'
import App from './App.svelte'
import * as router from './router.js'
import './routes.js'
import { files } from './models/files'
import { bpm, quantize } from './models/time'
import { Scheduler } from './models/scheduler'
import { Group, groups } from './models/group'
import { Sample, samples } from './models/sample'

const audioContext = new AudioContext()
const scheduler = Scheduler({
  audioContext,
  bpm: get(bpm),
  quantize: get(quantize)
})
scheduler.start()
bpm.subscribe($bpm => scheduler.bpm = $bpm)
quantize.subscribe($quantize => scheduler.quantize = $quantize)

models(4, Group, groups, { audioContext })
models(7, Sample, samples, { audioContext, group: groups[0], bpm, scheduler })

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
