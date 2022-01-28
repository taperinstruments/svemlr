import { derived } from 'svelte/store'

export function subscribe (stores, callback) {
  const store = derived(stores, callback)
  const unsubscribe = store.subscribe(() => {})
  return unsubscribe
}
