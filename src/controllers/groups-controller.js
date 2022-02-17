import { groups } from '../models/group'

export default {
  change: ({ x, grid }) => {
    const keyDowns = grid[0].reduce(
      (prev, value, x) => value ? prev.concat(x) : prev, []
    )
    const modifier1 = keyDowns.includes(grid[0].length - 2)
    const modifier2 = keyDowns.includes(grid[0].length - 1)

    if (modifier1 && modifier2) groups[x].toggleMute()
    else groups[x].stop()
  }
}
