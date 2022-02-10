<script>
  export let group = {}
  export let monome
  let { id, active, muted, level } = group

  $: if (!$active) group.stop()

  $: monome.gridLed(id, 0, $active)
</script>

<div>
  <label>
    <input type="checkbox" bind:checked={$active} disabled={!$active}>
    On/Off
  </label>

  <label>
    <input type="checkbox" bind:checked={$muted}>
    Mute
  </label>

  <label>
    Level
    <input type="range" min="0" max="1" step="0.01" bind:value={$level}>
  </label>
</div>

<style>
  label + label {
    margin-left: 1rem;
  }
</style>
