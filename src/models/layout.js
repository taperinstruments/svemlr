import { arrayOf } from '../helpers/array-helpers'
import { Group, groups } from './group'
import { Sample, samples } from './sample'
import { Pattern, patterns } from './pattern'

export function Layout (width, height, context) {
  const audioContext = context.get('audioContext')
  const bpm = context.get('bpm')
  const scheduler = context.get('scheduler')
  const router = context.get('router')

  const sampleCount = height - 1
  const stepCount = width

  const _groups = scaffold(4, Group, { audioContext })
  groups.set(_groups)

  patterns.set(scaffold(2, Pattern, { bpm, scheduler, router }))

  samples.set(scaffold(sampleCount, Sample, {
    audioContext,
    group: _groups[0],
    stepCount,
    bpm,
    scheduler
  }))
}

function scaffold (count, Model, options) {
  return arrayOf(count, i => Model({ id: i, ...options }))
}
