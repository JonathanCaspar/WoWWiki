import React from 'react'
import { useTranslation } from 'react-i18next'
//import './Pets.css'

function Pets() {
	const { t } = useTranslation('common')

	return (
		<div className="Pets">
			<h2>{t('pets.title')}</h2>
		</div>
	)
}

export default Pets
