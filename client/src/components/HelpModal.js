import React from 'react'
import ReactModal from 'react-modal'

import { Button } from './Button'
import { speak } from '../drivers/speech'

import './HelpModal.css'

ReactModal.setAppElement('#root')

// the Modal className props do not seem to work and can't use this syntaxt in page.css
const modalStyle = small => ({
  overlay: {
    backgroundColor: 'rgba(50, 50, 50, 0.95)',
    zIndex: 10, // so on top of slideshow which uses 1 for top of stack
  },
  content: {
    position: 'fixed',
    top: small ? '16vh' : '5vh',
    left: small ? '20vw' : '5vw',
    right: small ? '20vw' : '5vw',
    bottom: small ? '16vh' : '5vh',
    background: 'lightgoldenrodyellow',
    outline: 'none',
    overflow: 'none',
    borderRadius: '1rem',
    border: '0.3rem solid darkred',
    padding: '0.5rem',
  },
})

export const HelpModal = ({
  open,
  speak: doSpeak,
  show,
  closeFn,
  small,
  title,
  text,
  helpFn,
  moreFn,
}) => (
  <ReactModal
    isOpen={open && show}
    contentLabel="Help Information"
    onRequestClose={closeFn}
    style={modalStyle(small === 'true')}
  >
    {(doSpeak => {
      if (doSpeak) {
        speak(title + '.')
        const done = speak(text + '.')
        if (!show) {
          done.then(closeFn)
        }
        return undefined
      }
    })(open && doSpeak)}
    <div className="modal-content">
      <div className="help-content">
        <div className="helpScreenName">{title}</div>
        <p>{text}</p>
      </div>
      <div className="button-container">
        {moreFn && (
          <Button
            className="button help-more"
            actionFn={moreFn}
            label="Learn More"
            helpFn={() => {}} //no helpFn as gets recursive!
          />
        )}
        <Button
          className="button help-close"
          actionFn={closeFn}
          label="Continue"
          helpFn={() => {}} //no helpFn as gets recursive!
        />
      </div>
    </div>
  </ReactModal>
)

ReactModal.setAppElement('#root')
