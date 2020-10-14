import React from 'react'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation('common')
  return (
    <footer className="py-1 bg-dark text-white" style={{ fontSize: '10pt' }}>
      {t('footer.copyright')}
    </footer>
  )
}

export default Footer
