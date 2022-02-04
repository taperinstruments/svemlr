import { groups } from '../models/group'

export default {
  stop: ({ x }) => {
    groups[x].stop()
  }
}
