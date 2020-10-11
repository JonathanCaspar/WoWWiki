import React from 'react'
import { Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import MountsList from './MountsList'
import MountViewer from './MountViewer'
import './Mounts.css'

function Mounts() {
  const { t } = useTranslation('common')

  return (
    <div className="Mounts">
      <h2>{t('mounts.title')}</h2>
      <div className="mounts-nav-container">
        <MountsList />
        <Route path="/mounts/:mountId" component={MountViewer} />
      </div>
    </div>
  )
}

export default Mounts
