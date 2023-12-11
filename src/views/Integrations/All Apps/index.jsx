import classNames from 'classnames'
import { useState } from 'react'
import AppsSidebar from '../AppsSidebar'
import Body from './Body'
import Header from './Header'

const AllApps = () => {
  const [showSidebar, setShowSidebar] = useState(true)

  return (
    <div className='hk-pg-body py-0'>
      <div className={classNames('integrationsapp-wrap', { 'integrationsapp-sidebar-toggle': !showSidebar })}>
        <AppsSidebar />
        <div className='integrationsapp-content'>
          <div className='integrationsapp-detail-wrap'>
            <Header toggleSidebar={() => setShowSidebar(!showSidebar)} show={showSidebar} />
            <Body />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllApps
