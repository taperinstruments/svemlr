<script>
  import Channel from './lib/Channel.svelte'
  let channels = Array(8).fill(null).map((ch, i) => ({ id: i }))
</script>

<main>
  <table>
    <thead>
    <th></th>
    <th>Octave</th>
    <th>Speed</th>
    <th></th>
    <th>Group</th>
    </thead>
    <tbody>
      {#each channels as channel}
        <Channel {...channel} />
      {/each}
    </tbody>
  </table>
</main>