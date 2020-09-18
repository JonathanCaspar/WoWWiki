import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import BlizzardAPI from '../api/BlizzardAPI'
//import './Mounts.css'

class Mounts extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		BlizzardAPI.getMountsList(this.props.token)
	}
	render() {
		const { t } = this.props
		return (
			<div className="Mounts">
				<h2>{t('mounts.title')}</h2>
			</div>
		)
	}
}

export default withTranslation('common')(Mounts)
