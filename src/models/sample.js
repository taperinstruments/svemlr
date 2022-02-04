import { writable, derived } from 'svelte/store'
import { arrayOf } from '../helpers/array-helpers'
import { reverseBuffer, createBufferSource } from '../helpers/audio-helpers'
import { Playhead } from './playhead'

export const samples = []

/**
 * @param {{
 *  id: number,
 *  audioContext: AudioContext,
 *  group: object,
 *  bpm: import('svelte/store').Writable,
 *  scheduler: object
 * }} options
 * @returns {object}
 */
export function Sample ({ id, audioContext, group, bpm, scheduler }) {
  group = writable(group)
  const STEP_COUNT = 16
  const buffer = writable(null)
  const reffub = derived(
    buffer,
    ($buffer) => $buffer && reverseBuffer($buffer)
  )
  const duration = derived(buffer, $buffer => $buffer?.duration || 0)
  const octave = writable(0)
  const reverse = writable(false)
  const startStep = writable(0)
  const loopStartStep = writable(0)
  const loopEndStep = writable()
  const enabledStepCount = writable(16)
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
  const currentStep = derived(
    [progress, playing, enabledStepCount],
    ([$progress, $playing, $enabledStepCount]) =>
      $playing ? transpose(Math.floor($progress * $enabledStepCount)) : null
  )
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
      ($duration / $enabledStepCount) *
        ($loopEndStep != null ? $loopEndStep : $enabledStepCount)
  )
  const loopDuration = derived(
    [loopStart, loopEnd],
    ([$loopStart, $loopEnd]) => $loopEnd - $loopStart
  )
  const loop = derived(loopStart, $loopStart => $loopStart != null)

  const settings = {
    group,
    buffer,
    reffub,
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

  let source
  let playhead
  loopStart.subscribe(value => {
    source && (source.loopStart = value)
    playhead?.check()
  })
  loopEnd.subscribe(value => {
    source && (source.loopEnd = value)
    playhead?.check()
  })
  loop.subscribe(value => {
    source && (source.loop = value)
    playhead?.check()
  })
  speed.subscribe(value => {
    source && (source.playbackRate.value = value)
    playhead?.check()
  })

  function start (step) {
    if (!attrs.buffer || !validStep(step)) return

    scheduler.schedule(function () {
      startStep.set(transpose(step))
      source = setupSource()
      attrs.group.play(source, attrs.offset)

      playhead = Playhead(source, progress.set)
      playhead.start(attrs.offset)

      playing.set(true)
    })
  }

  function resetLoopPoints () {
    loopStartStep.set(0)
    loopEndStep.set(null)
  }

  function loopBetween (steps) {
    if (!validStep(steps[0]) || !validStep(steps[1])) return
    steps = transpose(steps)
    const { reverse } = attrs
    loopStartStep.set(reverse ? steps[1] : steps[0])
    loopEndStep.set(reverse ? steps[0] : steps[1])
  }

  function validStep (step) {
    return step < attrs.enabledStepCount
  }

  function transpose (step) {
    return Array.isArray(step) ? step.map(transposeStep) : transposeStep(step)
  }

  function transposeStep (step) {
    if (step == null) return step
    const { enabledStepCount, reverse } = attrs
    return reverse ? Math.abs(step - (enabledStepCount - 1)) : step
  }

  let sourceId
  function setupSource () {
    const { reverse, buffer, reffub, loop, loopStart, loopEnd, speed } = attrs
    sourceId = +new Date()
    source = createBufferSource(
      reverse ? reffub : buffer,
      audioContext,
      { loop, loopStart, loopEnd, speed }
    )
    // ensure the correct id is passed
    source.onended = ((id) => () => deactivate(id))(sourceId)
    return source
  }

  function deactivate (id) {
    if (!id || sourceId === id) playing.set(false)
  }

  return {
    id,
    ...settings,
    start,
    resetLoopPoints,
    loopBetween
  }
}