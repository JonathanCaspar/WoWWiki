import React from 'react'
import { useTranslation } from 'react-i18next'
import Spinner from 'react-bootstrap/Spinner'
import './LoadingSpinner.css'

function LoadingSpinner() {
  let { t } = useTranslation('common')

  return (
    <div className="loading-spinner center-div">
      <Spinner animation="border" role="status" size="sm" />
      <span>{t('common.loading')} ...</span>
    </div>
  )
}

export default LoadingSpinner