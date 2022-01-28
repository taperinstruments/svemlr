import { writable, derived } from 'svelte/store'
import { arrayOf } from '../helpers/array-helpers'
import { subscribe } from '../helpers/store-helpers'

export let samples = []

export function createSamples (count, options) {
  return samples = arrayOf(count, i => createSample({ id: i, ...options }))
}

/**
 *
 * @param {{
 *  id: number,
 *  group: object,
 *  bpm: import('svelte/store').Writable,
 *  quantize: import('svelte/store').Writable,
 *  scheduler: object
 * }} options
 * @returns {object}
 */
export function createSample ({ id, group, bpm, quantize, scheduler }) {
  group = writable(group)
  const STEP_COUNT = 16
  const buffer = writable(null)
  const duration = derived(buffer, $buffer => $buffer?.duration)
  const octave = writable(0)
  const reverse = writable(false)
  const startStep = writable(0)
  const loopStartStep = writable(0)
  const loopEndStep = writable()
  const enabledStepCount = writable(8)
  const steps = derived(
    enabledStepCount,
    $enabledStepCount =>
      arrayOf(STEP_COUNT, i => ({ enabled: i < $enabledStepCount }))
  )
  const enabledSteps = derived(
    steps,
    $steps => $steps.filter(({ enabled }) => enabled)
  )
  const stepDuration = derived(bpm, $bpm => 60 / $bpm)
  const stepsDuration = derived(
    [stepDuration, enabledStepCount],
    ([$stepDuration, $enabledStepCount]) => $stepDuration * $enabledStepCount
  )
  const progress = writable(0)
  const playing = writable(false)
  const currentStep = writable(null)
  const speed = derived(
    [duration, stepsDuration, octave],
    ([$duration, $stepsDuration, $octave]) =>
      $duration ? ($duration / $stepsDuration) * Math.pow(2, $octave) : 1
  )
  const offset = derived(
    [duration, enabledStepCount, startStep],
    ([$duration, $enabledStepCount, $startStep]) =>
      ($duration / $enabledStepCount) * $startStep
  )
  const loopStart = derived(
    [duration, enabledStepCount, loopStartStep],
    ([$duration, $enabledStepCount, $loopStartStep]) =>
      ($duration / $enabledStepCount) * $loopStartStep
  )
  const loopEnd = derived(
    [duration, enabledStepCount, loopEndStep],
    ([$duration, $enabledStepCount, $loopEndStep]) =>
      ($duration / $enabledStepCount) * ($loopEndStep || $enabledStepCount)
  )
  const loopDuration = derived(
    [loopStart, loopEnd],
    ([$loopStart, $loopEnd]) => $loopEnd - $loopStart
  )
  const loop = derived(loopStart, $loopStart => $loopStart != null)

  const settings = {
    group,
    buffer,
    duration,

    enabledStepCount,
    steps,
    enabledSteps,
    currentStep,
    offset,

    octave,
    speed,
    reverse,

    loopStart,
    loopEnd,
    loopDuration,
    loop,

    progress
  }

  const attrs = {}
  for (const key in settings) {
    settings[key].subscribe(value => attrs[key] = value)
  }

  bpm.subscribe($bpm => scheduler.bpm = $bpm)
  quantize.subscribe($quantize => scheduler.quantize = $quantize)

  subscribe(
    [progress, playing, enabledStepCount],
    ([$progress, $playing, $enabledStepCount]) => {
      currentStep.set(
        $playing ? Math.floor($progress * $enabledStepCount) : null
      )
    }
  )

  function start (step) {
    if (!attrs.buffer || !validStep(step)) return

    scheduler.schedule(function () {
      startStep.set(step)
      attrs.group.play(attrs.buffer, attrs.offset, sample)
      playing.set(true)
    })
  }

  function stop () {
    playing.set(false)
  }

  function loopBetween ([startStep, endStep]) {
    if (!validStep(startStep) || !validStep(endStep)) return
    loopStartStep.set(startStep)
    loopEndStep.set(endStep)
  }

  function validStep (step) {
    return step < attrs.enabledStepCount
  }

  const sample = { id, ...settings, start, stop, loopBetween }

  return sample
}
