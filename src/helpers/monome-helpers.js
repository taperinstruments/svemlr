import { chunk } from './array-helpers'

export function gridLedRow (monome, y, states) {
  const QUAD_SIZE = 8
  const quads = chunk(states, QUAD_SIZE)
  quads.forEach((quad, i) => monome.gridLedRow(i * QUAD_SIZE, y, quad))
}

export function blink (monome, x, y, initial, duration = 50) {
  monome.gridLed(x, y, !initial)
  setTimeout(() => monome.gridLed(x, y, initial), duration)
}
