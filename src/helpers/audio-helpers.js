const fileReader = new FileReader()
export function fileToAudioBuffer (file, audioContext) {
  return new Promise(resolve => {
    fileReader.readAsArrayBuffer(file)
    fileReader.onload = async ({ target: { result } }) => {
      resolve(await audioContext.decodeAudioData(result))
    }
  })
}

export function reverseBuffer (buffer) {
  const reversed = new AudioBuffer({
    sampleRate: buffer.sampleRate,
    numberOfChannels: buffer.numberOfChannels,
    length: buffer.length
  })

  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    const source = buffer.getChannelData(channel)
    const destination = reversed.getChannelData(channel)
    // iterate in reverse
    for (var i = buffer.length - 1; i >= 0; i--) {
      destination[buffer.length - i - 1] = source[i]
    }
  }

  return reversed
}

export function createBufferSource (buffer, audioContext, options) {
  const source = audioContext.createBufferSource()
  if (buffer) source.buffer = buffer

  const { loopStart, loopEnd, loop, speed } = options
  source.loop = !!loop
  if (loopStart != null) source.loopStart = loopStart
  if (loopEnd != null) source.loopEnd = loopEnd
  if (speed != null) source.playbackRate.value = speed

  return source
}
