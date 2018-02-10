export default function speak(what) {
  if (window.speechSynthesis !== undefined) {
    const utterance = new SpeechSynthesisUtterance(what)
    window.speechSynthesis.speak(utterance)
  }
}
