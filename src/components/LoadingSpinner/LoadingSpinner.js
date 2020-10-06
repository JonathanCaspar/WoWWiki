import React from 'react'
import Loader from 'react-loader-spinner'
import { useTranslation } from 'react-i18next'

const LoadingSpinner = () => {
  const { t } = useTranslation('common')
  return (
    <div>
      <span>{t('common.loading')} </span>
      <Loader
        className="loader"
        type="Oval"
        color="#00BFFF"
        height={15}
        width={15}
      />
    </div>
  )
}

export default LoadingSpinner
