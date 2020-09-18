import React from 'react'
import { useTranslation } from 'react-i18next'
import './Footer.css'

function Footer() {
	const { t } = useTranslation('common')
	return <div className="footer">{t('footer.copyright')}</div>
}

export default Footer
