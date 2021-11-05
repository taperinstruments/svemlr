<script>
  export let level
  export let muted
</script>
<div>
  <label>
    <input type="checkbox" bind:checked={$muted} />
    Mute
  </label>

  <input type="range" min="0" max="1" step="0.01" bind:value={$level} />
</div>
