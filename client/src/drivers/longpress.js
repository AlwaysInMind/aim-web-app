const mkLongPressFunction = (actionFn, helpFn) => {
  let t
  let l
  return e => {
    const type = e.type
    const isStartEvent = new Set(['mousedown', 'keydown', 'touchstart']).has(
      type
    )
    const isEndEvent = new Set(['mouseup', 'keyup', 'touchend']).has(type)
    const isMatchingEvent =
      isEndEvent &&
      { mouseup: 'mousedown', keyup: 'keydown', touchstart: 'touchend' }[
        type
      ] === l
    // TODO we assume end event will match start event
    if (isStartEvent) {
      l = type
      t = setTimeout(() => {
        t = undefined
      }, 1000)
    } else if (isMatchingEvent && t) {
      clearTimeout(t)
      t = l = undefined
      actionFn(e)
    } else if (isMatchingEvent && !t) {
      l = undefined
      helpFn(e)
    }
  }
}

export default mkLongPressFunction
