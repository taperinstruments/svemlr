import { chunk } from './array-helpers'

export function gridLedRow (monome, y, states) {
  const QUAD_SIZE = 8
  const quads = chunk(states, QUAD_SIZE)
  quads.forEach((quad, i) => monome.gridLedRow(i * QUAD_SIZE, y, quad))
}
