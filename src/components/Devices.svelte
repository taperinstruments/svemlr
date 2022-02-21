<script>
	import Qwerty32 from 'qwerty32'
  import WebMonome from 'webmonome'

  export let selected
  let klass

  const options = [
    { label: 'choose' },
    { label: 'qwerty32', klass: Qwerty32 },
    { label: 'monome grid', klass: WebMonome }
  ]

  async function connect () {
    selected = await klass?.connect()
  }
</script>

<label>
  Device
  <select bind:value={klass}>
    {#each options as { label, klass }}
      <option value={klass}>{label}</option>
    {/each}
  </select>
</label>

<button on:click={connect}>connect</button>

<div>
  For monome grid devices <strong>disable serialosc</strong>
</div>
<details>
  <summary>Disabling serialosc</summary>
  <p>To disable serialosc on macOS, open terminal and execute:</p>
  <pre><code>launchctl unload /library/launchagents/org.monome.serialosc.plist</code></pre>

  To re-enable, run:
  <pre><code>launchctl load /library/launchagents/org.monome.serialosc.plist</code></pre>
</details>

<style>
  div {
    margin: .5rem 0;
  }
  summary {
    cursor: pointer;
  }
  code {
    font-family: 'Oxygen Mono', monospace;
  }
</style>
