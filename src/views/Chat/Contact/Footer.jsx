import React, { useState } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { ArrowRight, Share, Smile } from 'react-feather'
//Redux
import { connect } from 'react-redux'
import { contactsMessage } from 'redux/action/Chat'

const Footer = ({ contactsMessage, contactMsg }) => {
  const [message, setMessage] = useState([])

  //Get current system time
  const current = new Date()
  const msgTitme = current.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  //Send a new messages
  const sendMessage = () => {
    contactsMessage({ text: message, time: msgTitme, types: 'sent' })
    if (contactMsg) {
      setTimeout(() => {
        contactsMessage({ text: 'What are you saying?', time: msgTitme, types: 'received' })
      }, 800)
    }
  }

  const handleClick = () => {
    sendMessage()
    setMessage('')
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      sendMessage()
      setMessage('')
    }
  }

  return (
    <footer className='chat-footer'>
      <Dropdown>
        <Dropdown.Toggle variant='flush-dark' className='btn-icon btn-rounded flush-soft-hover no-caret flex-shrink-0'>
          <span className='icon'>
            <span className='feather-icon'>
              <Share />
            </span>
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <div className='d-flex align-items-center'>
              <div className='avatar avatar-icon avatar-xs avatar-soft-primary avatar-rounded me-3'>
                <span className='initial-wrap'>
                  <i className='ri-image-line' />
                </span>
              </div>
              <div>
                <span className='h6 mb-0'>Photo or Video Library</span>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item>
            <div className='d-flex align-items-center'>
              <div className='avatar avatar-icon avatar-xs avatar-soft-info avatar-rounded me-3'>
                <span className='initial-wrap'>
                  <i className='ri-file-4-line' />
                </span>
              </div>
              <div>
                <span className='h6 mb-0'>Documents</span>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item>
            <div className='d-flex align-items-center'>
              <div className='avatar avatar-icon avatar-xs avatar-soft-success avatar-rounded me-3'>
                <span className='initial-wrap'>
                  <i className='ri-map-pin-line' />
                </span>
              </div>
              <div>
                <span className='h6 mb-0'>Location</span>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item>
            <div className='d-flex align-items-center'>
              <div className='avatar avatar-icon avatar-xs avatar-soft-blue avatar-rounded me-3'>
                <span className='initial-wrap'>
                  <i className='ri-contacts-line' />
                </span>
              </div>
              <div>
                <span className='h6 mb-0'>Contact</span>
              </div>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className='input-group'>
        <span className='input-affix-wrapper'>
          <input type='text' id='input_contact_chat' name='send-msg' className='input-msg-send form-control rounded-input' placeholder='Type your message...' value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={onKeyDown} />
          <span className='input-suffix'>
            <Button variant='flush-primary' className='btn-icon btn-rounded btn-send'>
              <span className='icon' onClick={handleClick}>
                <span className='feather-icon'>
                  <ArrowRight />
                </span>
              </span>
            </Button>
          </span>
        </span>
      </div>
      <Button className='btn-icon btn-flush-dark btn-rounded flush-soft-hover'>
        <span className='icon'>
          <span className='feather-icon'>
            <Smile />
          </span>
        </span>
      </Button>
    </footer>
  )
}

const mapStateToProps = ({ chatReducer }) => {
  const { contactMsg } = chatReducer
  return { contactMsg }
}

export default connect(mapStateToProps, { contactsMessage })(Footer)
