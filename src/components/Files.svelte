<script>
  export let files
  let newFiles
  $: files.add(newFiles)
</script>

<section>
  <label for="files">Audio file drop</label>
  <div class="file-drop">
    <input accept="audio/*" bind:files={newFiles} id="files" name="files" type="file" />

    {#if $files.length}
      <ul>
      {#each $files as {name}}
        <li>{name}</li>
      {/each}
      </ul>
    {/if}
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
  }
  .file-drop {
    position: relative;
    flex-grow: 1;
    background-color: lightgray;
  }
  input[type=file] {
    opacity: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  ul {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
