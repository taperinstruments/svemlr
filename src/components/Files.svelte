<script>
  export let files
  let newFiles
  $: files.add(newFiles)

  let dragover = false

  function drop ({ dataTransfer }) {
    dragover = false
    files.add(mediaFiles([...dataTransfer.items]))
  }

  function mediaFiles (dataTransferItems) {
    return dataTransferItems.reduce((memo, current) => {
      if (current.kind === 'file') {
        const file = current.getAsFile()
        if (/^(audio|video)/.test(file.type)) memo.push(file)
      }
      return memo
    }, [])
  }
</script>

<section>
  <label for="files">Audio file drop</label>
  <div
    class="file-drop"
    class:dragover
    on:dragover|preventDefault={() => dragover = true}
    on:dragleave|preventDefault={() => dragover = false}
    on:drop|preventDefault={drop}>

    <input accept="audio/*" bind:files={newFiles} id="files" name="files" type="file" />

    {#if $files.length}
      <ul>
      {#each $files as {name}}
        <li>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V6H8.5C8.22386 6 8 5.77614 8 5.5V2H3.5ZM9 2.70711L11.2929 5H9V2.70711ZM2 2.5C2 1.67157 2.67157 1 3.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645L12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          {name}
        </li>
      {/each}
      </ul>
    {/if}
  </div>
</section>

<style>
  section {
    margin-left: auto;
    display: flex;
    flex-direction: column;
  }
  .file-drop {
    position: relative;
    flex-grow: 1;
    background-color: whitesmoke;
    border: 1px solid transparent;
  }

  .dragover {
    border-color: gray
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
    margin: 0;
    padding: 0.5rem;
    position: absolute;
    top: 0;
    left: 0;
  }

  li {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
  }

  li + li {
    margin-top: .5rem;
  }

  li svg {
    margin-right: .25rem;
  }
</style>
