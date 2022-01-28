export function subscribe (stores, callback) {
  const values = []
  const unsubscribes = stores.map((store, i) => {
    return store.subscribe(value => {
      values[i] = value
      callback(values)
    })
  })
  return function unsubscribe () {
    unsubscribes.forEach(unsubscribe => unsubscribe())
  }
}
