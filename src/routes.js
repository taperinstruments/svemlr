import { route } from './router'
import samples from './controllers/samples-controller'
import groups from './controllers/groups-controller'
import patterns from './controllers/patterns-controller'

route(
  ({ y, state }) => state && y > 0,
  samples.loop
)
route(
  ({ x, y, state }) => state && x < 4 && y === 0,
  groups.stop
)
route(
  ({ x, y }) => (x == 4 || x == 5) && y == 0,
  patterns.record
)
