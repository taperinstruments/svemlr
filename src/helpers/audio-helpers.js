export async function fetchAudioBuffer (filepath, audioContext) {
  const response = await fetch(filepath)
  const arrayBuffer = await response.arrayBuffer()
  return audioContext.decodeAudioData(arrayBuffer)
}
