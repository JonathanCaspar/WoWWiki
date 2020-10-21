import React from 'react'
import { Route } from 'react-router-dom'

import MountsList from './MountsList'
import MountViewer from './MountViewer'
import './Mounts.css'

function Mounts() {
  return (
    <div className="mounts-container">
      <MountsList />
      <Route path="/mounts/:mountId" component={MountViewer} />
    </div>
  )
}

export default Mounts
