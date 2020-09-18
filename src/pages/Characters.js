import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
//import './Characters.css'

class Characters extends Component {
	
	constructor(props) {
		super(props)
		this.state = { value: '' }
		this.handleCharacterSearch = this.handleCharacterSearch.bind(this)
	}

	handleCharacterSearch(event) {
		let value = event.target.value
		let formatValue =
			value.length >= 1
				? value.substr(0, 1).toUpperCase() +
				  value.substr(1, value.length).toLowerCase() // first letter to uppercase, rest of letters to lowercase
				: value
		this.setState({ value: formatValue })
	}

	render() {
		const { t } = this.props

		return (
			<div className="Characters">
				<h2>{t('characters.title')}</h2>
				<form onSubmit={null}>
					<label>
						{t('characters.name-query')}
						<input
							type="text"
							value={this.state.value}
							onChange={this.handleCharacterSearch}
						/>
					</label>
					<input type="submit" value={t('common.load')} />
				</form>
			</div>
		)
	}
}

export default withTranslation('common')(Characters)
