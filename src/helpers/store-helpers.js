export function subscribe (stores, fn) {
  const values = []
  const unsubscribes = stores.map((store, i) => {
    return store.subscribe(value => {
      values[i] = value
      fn(values)
    })
  })
  return function () {
    unsubscribes.forEach(unsubscribe => unsubscribe())
  }
}
