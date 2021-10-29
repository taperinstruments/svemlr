import { writable, readable } from 'svelte/store'

export const audioContext = readable(new AudioContext())
export const bpm = writable(120)
export const quantize = writable(16)
