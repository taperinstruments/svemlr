import { arrayOf } from './array-helpers'

// Creates a number or models and pushes them on to the given array
export function models (count, Model, array, options) {
  arrayOf(count, i => {
    const model = Model({ id: i, ...options })
    array.push(model)
    return model
  })
  return array
}
