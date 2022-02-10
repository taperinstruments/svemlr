<script>
  export let files
  export let selected
</script>

<select bind:value={selected}>
  {#each $files as file}
    <option value={file}>
      {file.name}
    </option>
  {/each}
</select>

<style>
  select {
    width: 12rem;
  }
</style>
