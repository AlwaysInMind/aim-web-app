import React from 'react'

import ReactModal from 'react-modal'

import { Button, SpeakingButton } from './Button'

import './HelpModal.css'

// the Modal className props do not seem to work and can't use this syntaxt in page.css
const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(50, 50, 50, 0.95)',
    zIndex: 10,
  },
  content: {
    position: 'fixed',
    top: '4vw',
    left: '4vw',
    right: '4vw',
    bottom: '4vw',
    background: 'lightgoldenrodyellow',
    outline: 'none',
    overflow: 'none',
    borderRadius: '1rem',
    border: '0.3rem solid darkred',
    padding: '0.5rem',
    fontSize: '2rem',
  },
}

const HelpModal = ({ isOpen, closeFn, content, children }) => (
  <ReactModal
    isOpen={isOpen}
    contentLabel="Help Information"
    onRequestClose={closeFn}
    style={modalStyle}
  >
    <div className="modal-content">
      <SpeakingButton className="header help-header" label="How to use this" />
      <div className="help-content">
        <p>
          Press the buttons to make things happen. Some buttons like the header
          above will just speak. Other buttons will let you do what is written
          on them. Still other buttons will take you to different screen.
        </p>
        <p>
          To find out what a button does you can press it for 1 second or double
          press it. You will be told what the button will do when pressed.
        </p>
        {children}
      </div>
      <Button
        className="button help-close"
        actionFn={closeFn}
        label="Carry On"
      />
    </div>
  </ReactModal>
)

ReactModal.setAppElement('#root')

export default HelpModal
