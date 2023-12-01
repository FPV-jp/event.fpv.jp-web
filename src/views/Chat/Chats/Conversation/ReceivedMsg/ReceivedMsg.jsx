import React from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { ArrowDown, CornerUpRight, MoreHorizontal } from 'react-feather'
import { Msg } from '../Messages'
//Image
import avatar8 from 'assets/dist/img/avatar8.jpg'

const ReceivedMsg = () => {
  return (
    <>
      {Msg.map((elem, index) => (
        <>
          {elem.from === 'opposite' ? (
            <>
              <li className='media received'>
                <div className='avatar avatar-xs avatar-rounded'>
                  <img src={avatar8} alt='user' className='avatar-img' />
                </div>
                <div className='media-body'>
                  <div className='msg-box'>
                    {
                      (elem.msgType = 'text' ? (
                        <>
                          <div>
                            <p>{elem.text}</p>
                            <span className='chat-time'>{elem.time}</span>
                          </div>
                          <div className='msg-action'>
                            <Button className='btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret'>
                              <span className='icon'>
                                <span className='feather-icon'>
                                  <CornerUpRight />
                                </span>
                              </span>
                            </Button>
                            <Dropdown>
                              <Dropdown.Toggle variant='flush-dark' className='btn-icon btn-rounded flush-soft-hover dropdown-toggle no-caret'>
                                <span className='icon'>
                                  <span className='feather-icon'>
                                    <MoreHorizontal />
                                  </span>
                                </span>
                              </Dropdown.Toggle>
                              <Dropdown.Menu align='end'>
                                <Dropdown.Item href='#forward'>Forward</Dropdown.Item>
                                <Dropdown.Item href='#copy'>Copy</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <div className='media'>
                              <div className='avatar avatar-icon avatar-sm avatar-blue'>
                                <span className='initial-wrap fs-3'>
                                  <i className={elem.fileIcon} />
                                </span>
                              </div>
                              <div className='media-body'>
                                <p className='file-name'>{elem.fileName}</p>
                                <p className='file-size'>{elem.fileSize}</p>
                              </div>
                            </div>
                            <div className='file-overlay'>
                              <Button variant='primary' size='sm' className='btn-icon btn-rounded'>
                                <span className='icon'>
                                  <span className='feather-icon'>
                                    <ArrowDown />
                                  </span>
                                </span>
                              </Button>
                            </div>
                          </div>
                        </>
                      ))
                    }
                  </div>
                </div>
              </li>
            </>
          ) : (
            <>
              <li className='media sent'>
                <div className='media-body'>
                  <div className='msg-box'>
                    <div>
                      <p>{elem.text}</p>
                      <span className='chat-time'>{elem.time}</span>
                    </div>
                    <div className='msg-action'>
                      <Button className='btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret'>
                        <span className='icon'>
                          <span className='feather-icon'>
                            <CornerUpRight />
                          </span>
                        </span>
                      </Button>
                      <Dropdown>
                        <Dropdown.Toggle variant='flush-dark' className='btn-icon btn-rounded flush-soft-hover dropdown-toggle no-caret'>
                          <span className='icon'>
                            <span className='feather-icon'>
                              <MoreHorizontal />
                            </span>
                          </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu align='end'>
                          <Dropdown.Item href='#forward'>Forward</Dropdown.Item>
                          <Dropdown.Item href='#copy'>Copy</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </li>
            </>
          )}
        </>
      ))}
    </>
  )
}

export default ReceivedMsg
