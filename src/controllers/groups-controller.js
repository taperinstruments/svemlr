import { groups } from '../models/group'

export default {
  change: ({ x, state, grid }) => {
    const keyDowns = grid[0].reduce(
      (prev, value, x) => value ? prev.concat(x) : prev, []
    )
    const modifier1 = keyDowns.includes(grid[0].length - 2)
    const modifier2 = keyDowns.includes(grid[0].length - 1)

    if (state) {
      if (modifier1 && modifier2) groups[x].toggleMute()
      else if (modifier1) groups[x].startDecreasingLevel()
      else if (modifier2) groups[x].startIncreasingLevel()
      else groups[x].stop()
    } else {
      groups[x].stopDecreasingLevel()
      groups[x].stopIncreasingLevel()
    }
  }
}
