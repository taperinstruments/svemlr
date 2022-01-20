<script>
  export let group
  export let monome
  let { id, active } = group

  $: monome.gridLed(group.id, 0, $active)
  $: if (!$active) group.stop()

  monome.on('gridKeyDown', ({ x, y }) => {
    if (x === id && y === 0) group.stop()
  })
</script>

<input type="checkbox" bind:checked={$active} name="group_{id}_active">
