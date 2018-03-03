import React from 'react'
import ReactModal from 'react-modal'

import { Button } from './Button'

import './HelpModal.css'

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
    fontSize: '2rem',
  },
})

export const HelpModal = ({
  open,
  closeFn,
  small,
  title,
  text,
  helpFn,
  moreFn,
}) => (
  <ReactModal
    isOpen={open}
    contentLabel="Help Information"
    onRequestClose={closeFn}
    style={modalStyle(small === 'true')}
  >
    <div className="modal-content">
      <div className="help-content">
        <h1 className="helpPageName">{title}</h1>
        <p>{text}</p>
      </div>
      <div className="button-container">
        {moreFn && (
          <Button
            className="button help-more"
            actionFn={moreFn}
            label="Explain More"
            helpFn={() => {}} //no helpFn as gets recursive!
          />
        )}
        <Button
          className="button help-close"
          actionFn={closeFn}
          label="Carry On"
          helpFn={() => {}} //no helpFn as gets recursive!
        />
      </div>
    </div>
  </ReactModal>
)

ReactModal.setAppElement('#root')
