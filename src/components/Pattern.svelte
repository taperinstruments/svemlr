<script>
  export let pattern = {}
  export let monome
  export let x
  let { id, active, toggle, length } = pattern

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
    <span>Length</span>
    <input type="range" min="1" max="32" bind:value={$length}>
    <input type="number" min="1" max="32" bind:value={$length}>
    <span>beats</span>
  </label>
</div>

<style>
  label + label {
    display: inline-flex;
    align-items: center;
    margin-left: 1rem;
  }

  label + label > * + * {
    margin-left: .5rem;
  }

  [type=number] {
    width: 3rem;
  }
</style>
