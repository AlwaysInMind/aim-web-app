export function speak(what) {
  if (window.speechSynthesis !== undefined) {
    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(what)
      utterance.onend = () => {
        resolve()
      }
      utterance.onerror = event => {
        reject(new Error(event.error))
      }
      window.speechSynthesis.speak(utterance)
    })
  }
}

export function cancelSpeech() {
  if (window.speechSynthesis !== undefined) {
    window.speechSynthesis.cancel()
  }
}
