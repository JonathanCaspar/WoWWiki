import React from 'react'
import { useTranslation } from 'react-i18next'

import MountsList from './MountsList'
import MountViewer from './MountViewer'
import './Mounts.css'

export const Mounts = () => {
  const { t } = useTranslation('common')

  return (
    <div className="Mounts">
      <h2>{t('mounts.title')}</h2>
      <div className="mounts-nav-container">
        <MountsList />
        <div className="spacer" />
        <MountViewer />
        <div className="spacer" />
      </div>
    </div>
  )
}

export default Mounts
