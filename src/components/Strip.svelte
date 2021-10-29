<script>
  export let source
</script>
<div>
  <label>
    <input type="checkbox" bind:checked={source.muted} />
    Mute
  </label>

  <input type="range" min="0" max="1" step="0.01" bind:value={source.level} />
</div>
