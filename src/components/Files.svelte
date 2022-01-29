<script>
  export let files
</script>

<section>
  <input accept="audio/*" bind:files={$files} id="files" name="files" type="file" />

  {#if $files.length}
    <ul>
    {#each $files as {name}}
      <li>{name}</li>
    {/each}
    </ul>
  {/if}
</section>
