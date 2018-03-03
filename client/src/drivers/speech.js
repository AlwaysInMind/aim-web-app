export function speak(what) {
  if (window.speechSynthesis !== undefined) {
    const utterance = new SpeechSynthesisUtterance(what)
    window.speechSynthesis.speak(utterance)
  }
}

export function cancelSpeech() {
  if (window.speechSynthesis !== undefined) {
    window.speechSynthesis.cancel()
  }
}
