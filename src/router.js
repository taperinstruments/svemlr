import { arrayOf } from './helpers/array-helpers'

const routes = []
const grid = arrayOf(16, () => arrayOf(16, 0))

export function route (matcher, handler) {
  routes.push({ matcher, handler })
}

export function start (device) {
  device.on('gridKeyDown', ({ x, y }) => handle({ x, y, state: 1 }))
  device.on('gridKeyUp', ({ x, y }) => handle({ x, y, state: 0 }))
}

function handle ({ x, y, state }) {
  grid[y][x] = Number(state)
  const route = findRoute(x, y, state)
  route?.handler({ x, y, state, grid })
}

function findRoute (x, y, state) {
  return routes.find(({ matcher }) => matcher({ x, y, state }))
}
