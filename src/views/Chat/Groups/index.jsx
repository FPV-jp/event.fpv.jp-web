import { useWindowWidth } from '@react-hook/window-size'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import ChatHeader from '../ChatHeader'
import InvitePeopleModal from '../InvitePeopleModal'
import Footer from './Footer'
import GroupChatBody from './GroupChatBody'
import GroupList from './GroupList'
import Info from './Info'
//Redux
import { connect } from 'react-redux'
import { StartConversation } from 'redux_/action/Chat'

const ChatGroups = ({ startChating }) => {
  const [showInfo, setShowInfo] = useState(true)
  const [invitePeople, setInvitePeople] = useState(false)

  const windowWidth = useWindowWidth()
  useEffect(() => {
    if (windowWidth <= 1199) {
      setShowInfo(false)
    } else {
      setShowInfo(true)
    }
  }, [windowWidth])

  return (
    <div className='hk-pg-body py-0'>
      <div className={classNames('chatapp-wrap', { 'chatapp-info-active': showInfo }, { 'chatapp-slide': startChating })}>
        <div className='chatapp-content'>
          <GroupList />
          <div className='chatapp-single-chat'>
            <ChatHeader infoState={showInfo} infoToggle={() => setShowInfo(!showInfo)} invitePeople={() => setInvitePeople(!invitePeople)} />
            <GroupChatBody />
            {/* <ChatFooter /> */}
            <Footer />
            <Info toggleInfo={() => setShowInfo(!showInfo)} invitePeople={() => setInvitePeople(!invitePeople)} />
          </div>
          {/* Invite People */}
          <InvitePeopleModal show={invitePeople} onClose={() => setInvitePeople(!invitePeople)} />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ chatReducer }) => {
  const { startChating } = chatReducer
  return { startChating }
}

export default connect(mapStateToProps, { StartConversation })(ChatGroups)
