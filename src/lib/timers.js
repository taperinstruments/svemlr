const workerBody = `
const _this = this

function start (type, duration, id) {
  postMessage({
    type,
    id,
    timerId: _this[type](callback, duration, id)
  })
}
function stop (type, id) {
  _this[type](id)
}
function callback (id) {
  postMessage({ type: 'callback', id })
}

self.onmessage = function (event) {
  if (event.data.type === 'setInterval' || event.data.type === 'setTimeout') {
    start(event.data.type, event.data.duration, event.data.id)
  } else if (event.data.type === 'clearInterval' || event.data.type === 'clearTimeout') {
    stop(event.data.type, event.data.id)
  }
}`

const blob = new Blob([workerBody], { type: 'text/javascript' })
const worker = new Worker(URL.createObjectURL(blob))
const fns = []
let id = 0

function timer (type, fn, duration) {
	fns[id] = { fn }
	const _id = id
	worker.postMessage({ type, duration, id })

	worker.onmessage = function (event) {
		if (event.data.type === type && event.data.id === _id) {
			fns[_id].timerId = event.data.timerId
		} else if (event.data.type === 'callback') {
			fns[event.data.id].fn()
		}
	}
	return id++
}

export function setInterval (fn, duration) {
	return timer('setInterval', fn, duration)
}

export function setTimeout (fn, duration) {
	return timer('setTimeout', fn, duration)
}

export function clearInterval (id) {
	worker.postMessage({ type: 'clearInterval', id: fns[id].timerId })
}

export function clearTimeout (id) {
	worker.postMessage({ type: 'clearTimeout', id: fns[id].timerId })
}
