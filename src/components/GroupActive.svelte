<script>
  export let group = {}
  export let monome
  let { id, active } = group

  $: if (!$active) group.stop()

  $: monome.gridLed(id, 0, $active)
</script>

<input type="checkbox" bind:checked={$active} disabled={!$active} name="group_{id}_active">
