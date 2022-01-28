import { samples } from '../stores/sample'

export default {
  loop: ({ x, y, grid }) => {
    const sample = samples[y - 1]

    // x coords of currently pressed buttons
    const keyDowns = grid[y].reduce(
      (prev, value, x) => value ? prev.concat(x) : prev, []
    )

    if (keyDowns.length === 1) {
      sample.start(x)
      sample.loopBetween([0, null])
    } else if (keyDowns.length === 2) {
      sample.loopBetween(keyDowns)
    }
  }
}
