export function promise() {
  let resolve = function (any) {}
  const promise = new Promise(r => resolve = r)
  return { promise, resolve }
}
