import { get } from 'svelte/store'
import App from './App.svelte'
import * as router from './router.js'
import './routes.js'
import { files } from './models/files'
import { bpm, quantize } from './models/time'
import { Scheduler } from './models/scheduler'

const audioContext = new AudioContext()
const scheduler = Scheduler({
  audioContext,
  bpm: get(bpm),
  quantize: get(quantize)
})
scheduler.start()
bpm.subscribe($bpm => scheduler.bpm = $bpm)
quantize.subscribe($quantize => scheduler.quantize = $quantize)

const app = new App({
  target: document.getElementById('app'),
  props: {
    router,
    files,
    bpm,
    quantize,
    scheduler
  },
  context: new Map([['audioContext', audioContext]])
})

export default app
