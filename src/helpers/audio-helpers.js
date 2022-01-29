const fileReader = new FileReader()
export function fileToAudioBuffer (file, audioContext) {
  return new Promise(resolve => {
    fileReader.readAsArrayBuffer(file)
    fileReader.onload = async ({ target: { result } }) => {
      resolve(await audioContext.decodeAudioData(result))
    }
  })
}
