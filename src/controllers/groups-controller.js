import { groups } from '../stores/group'

export default {
  stop: ({ x }) => {
    groups[x].stop()
  }
}
