import { uniqueBy } from '../helpers/array-helpers'
import { writable } from 'svelte/store'

const { subscribe, update } = writable([])

function add (files = []) {
  files = [...files]
  update($files => uniqueBy([...$files, ...files], file => file.name))
}

export const files = { subscribe, add }
