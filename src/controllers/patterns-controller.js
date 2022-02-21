import { $groups } from '../models/group'
import { $patterns } from '../models/pattern'

export default {
  record: ({ x, y, state }) => {
    $patterns.forEach(pattern => pattern.record({ x, y, state }))
  },

  toggle: ({ x }) => {
    const xOffset = $groups.length
    const index = x - xOffset
    $patterns[index].toggle()
  },
}
