import { route } from './router'
import samples from './controllers/samples-controller'
import groups from './controllers/groups-controller'
import patterns from './controllers/patterns-controller'

route(
  ({ y, state, source }) => y > 0 && source === 'press' && state,
  [samples.loop, patterns.record],
)
route(
  ({ y, state, source }) => y > 0 && source === 'pattern' && state,
  [samples.replay],
)
route(
  ({ x, y }) => y === 0 && x < 4,
  groups.change
)
route(
  ({ x, y, state }) => y == 0 && (x == 4 || x == 5) && state,
  patterns.toggle
)
