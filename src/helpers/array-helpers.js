export function arrayOf (count, item) {
  const array = []
  for (let index = 0; index < count; index++) {
    array[index] = typeof item === 'function' ? item(index) : item
  }
  return array
}

export function chunk (array, size) {
  const chunks = []
  let i = 0
  const n = array.length
  while (i < n) chunks.push(array.slice(i, i += size))
  return chunks
}

export function uniqueBy (array, predicate) {
  return array.reduce((memo, current) => {
    const value = predicate(current)
    if (!memo.find((item) => predicate(item) === value)) {
      memo.push(current)
    }
    return memo
  }, [])
}
