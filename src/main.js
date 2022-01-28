import App from './App.svelte'
import * as router from './router.js'
import './routes.js'
import { bpm, quantize } from './stores/time.js'
import { createGroups } from './stores/group'
import { createSamples } from './stores/sample'

const audioContext = new AudioContext()
const groups = createGroups(4, audioContext)
const samples = createSamples(7, { group: groups[0], bpm })

const app = new App({
  target: document.getElementById('app'),
  props: {
    router,
    bpm,
    quantize,
    groups,
    samples
  },
  context: new Map([['audioContext', audioContext]])
})

export default app
