<script>
  import { blink } from '../helpers/monome-helpers'
  export let pattern = {}
  export let monome
  let { id, active, toggle } = pattern
  const x = id + 4

  pattern.onactivity = () => {
    blink(monome, x, 0, 1)
  }
  $: monome.gridLed(x, 0, $active)

</script>

<input
  name="pattern_{id}_active"
  type="checkbox"
  checked={$active}
  on:change|preventDefault={toggle}>
