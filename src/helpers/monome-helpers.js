import { chunk } from './array-helpers'

export function gridLedRow (monome, y, states) {
  const QUAD_SIZE = 8
  const quads = chunk(states, QUAD_SIZE)
  quads.forEach((quad, i) => monome.gridLedRow(i * QUAD_SIZE, y, quad))
}

export async function gridSize (monome) {
  return new Promise(resolve => {
    monome.on('getGridSize', e => resolve(e))
    monome.getGridSize()
  })
}
