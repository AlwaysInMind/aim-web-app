export const mkLongPressFunction = (actionFn, helpFn) => {
  let timeout
  let last
  return e => {
    const type = e.type
    const isActivateKey = e.keyCode === 13 || e.keyCode === 32
    const isStartEvent =
      type === 'mousedown' ||
      type === 'touchstart' ||
      (type === 'keydown' && isActivateKey)
    const isEndEvent =
      type === 'mouseup' ||
      type === 'touchend' ||
      (type === 'keyup' && isActivateKey)
    const isMatchingEvent =
      isEndEvent &&
      { mouseup: 'mousedown', keyup: 'keydown', touchstart: 'touchend' }[
        type
      ] === last
    // TODO what if mousedown and then drag off before mouseup
    if (isStartEvent && last === undefined) {
      last = type
      timeout = setTimeout(() => {
        timeout = undefined
      }, 1000)
    } else if (isMatchingEvent && timeout) {
      clearTimeout(timeout)
      timeout = last = undefined
      actionFn(e)
    } else if (isMatchingEvent && !timeout) {
      last = undefined
      helpFn(e)
    }
  }
}
