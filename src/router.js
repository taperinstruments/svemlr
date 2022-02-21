import { arrayOf } from './helpers/array-helpers'
import { gridSize } from './helpers/monome-helpers'

const routes = []
let currentDevice
let onKeyDown
let onKeyUp
let grid = arrayOf(16, () => arrayOf(16, 0))

export function route (matcher, handler) {
  routes.push({ matcher, handler })
}

export async function start (device) {
  stop()
  device.addEventListener('gridKeyDown', onKeyDown = ({ detail: { x, y } }) =>
    handle({ x, y, state: 1, source: 'press' })
  )
  device.addEventListener('gridKeyUp', onKeyUp = ({ detail: { x, y } }) =>
    handle({ x, y, state: 0, source: 'press' })
  )
  currentDevice = device
  const { x, y } = await gridSize(device)
  grid = arrayOf(y, () => arrayOf(x, 0))
}

export function stop () {
  currentDevice?.removeEventListener('gridKeyDown', onKeyDown)
  currentDevice?.removeEventListener('gridKeyUp', onKeyUp)
}

export function handle ({ x, y, state, source }) {
  if (source === 'press') grid[y][x] = Number(state)

  const route = findRoute(x, y, state, source)
  if (!route) return

  const args = { x, y, state, grid }
  if (Array.isArray(route.handler)) {
    route.handler.forEach(fn => fn(args))
  } else {
    route.handler(args)
  }
}

function findRoute (x, y, state, source) {
  return routes.find(({ matcher }) => matcher({ x, y, state, source }))
}
