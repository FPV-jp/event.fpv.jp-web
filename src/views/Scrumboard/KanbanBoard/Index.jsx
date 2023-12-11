import classNames from 'classnames'
import { useState } from 'react'
import Sidebar from '../Sidebar'
import Board from './Board'
import BoardHeader from './BoardHeader'
import EditTaskList from './EditTaskList'
import TaskDetails from './TaskDetails'
import TaskboardInfo from './TaskboardInfo'

const KanbanBoard = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  return (
    <div className='hk-pg-body py-0'>
      <div className={classNames('taskboardapp-wrap', { 'taskboardapp-sidebar-toggle': !showSidebar }, { 'taskboardapp-info-active': showInfo })}>
        <Sidebar />
        <div className='taskboardapp-content'>
          <div className='taskboardapp-detail-wrap'>
            <BoardHeader showSidebar={showSidebar} toggleSidebar={() => setShowSidebar(!showSidebar)} showInfo={showInfo} toggleInfo={() => setShowInfo(!showInfo)} />
            {/* <Body /> */}
            {/* <MainBoard /> */}
            <Board />
            <TaskboardInfo onHide={() => setShowInfo(false)} />
          </div>
          {/* Task Details */}
          <TaskDetails />
          {/* Edit Task List */}
          <EditTaskList />
        </div>
      </div>
    </div>
  )
}

export default KanbanBoard
