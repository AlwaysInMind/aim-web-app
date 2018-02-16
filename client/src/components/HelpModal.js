import React from 'react'

import ReactModal from 'react-modal'

import { Button, SpeakingButton } from './Button'

import './HelpModal.css'

// the Modal className props do not seem to work and can't use this syntaxt in page.css
const modalStyle = small => ({
  overlay: {
    backgroundColor: 'rgba(50, 50, 50, 0.95)',
    zIndex: 10, // so on top of slideshow which uses 1 for top of stack
  },
  content: {
    position: 'fixed',
    top: small ? '16vw' : '4vw',
    left: small ? '20vw' : '4vw',
    right: small ? '20vw' : '4vw',
    bottom: small ? '16vw' : '4vw',
    background: 'lightgoldenrodyellow',
    outline: 'none',
    overflow: 'none',
    borderRadius: '1rem',
    border: '0.3rem solid darkred',
    padding: '0.5rem',
    fontSize: '2rem',
  },
})

const HelpModal = ({ open, closeFn, small, title, children, helpFn }) => (
  <ReactModal
    isOpen={open}
    contentLabel="Help Information"
    onRequestClose={closeFn}
    style={modalStyle(small === 'true')}
  >
    <div className="modal-content">
      <SpeakingButton
        className="header help-header"
        label={title}
        helpFn={() => {}} //no helpFn as gets recursive!helpFn={helpFn}
      />
      <div className="help-content">{children}</div>
      <Button
        className="button help-close"
        actionFn={closeFn}
        label="Carry On"
        helpFn={() => {}} //no helpFn as gets recursive!
      />
    </div>
  </ReactModal>
)

ReactModal.setAppElement('#root')

export default HelpModal
