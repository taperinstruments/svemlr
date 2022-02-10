<script>
  import { groups } from '../models/group'
  export let pattern = {}
  export let monome
  let { id, active, toggle, length } = pattern
  const x = id + groups.length

  pattern.onactivity = () => {
    monome.gridLed(x, 0, 0)
    setTimeout(() => $active && monome.gridLed(x, 0, 1), 50)
  }
  $: monome.gridLed(x, 0, $active)
</script>

<div>
  <label>
    <input
      id="pattern_{id}_active"
      name="pattern_{id}_active"
      type="checkbox"
      checked={$active}
      on:change|preventDefault={toggle}>
    On/Off
  </label>

  <label>
    Length
    <input type="range" min="1" max="32" bind:value={$length}>
    <input type="number" min="1" max="32" bind:value={$length}>
    beats
  </label>
</div>

<style>
  label + label {
    margin-left: 1rem;
  }
</style>
