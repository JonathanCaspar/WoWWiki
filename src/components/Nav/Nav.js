import React, { Component } from 'react'
import Burger from '@animated-burgers/burger-squeeze'
import { withTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import './Nav.css'
import '@animated-burgers/burger-squeeze/dist/styles.css'

class Nav extends Component {
	
	constructor(props) {
		super(props)
		this.state = { burgerOpen: false, lang: 'en' }
	}

	handleBurgerOpen = () => {
		this.setState((prevState) => {
			return { burgerOpen: !prevState.burgerOpen }
		})
	}

	handleLangChange = () => {
		const { t, i18n } = this.props

		this.setState((prevState) => {
			let prevLang = prevState.lang
			let newLang  = this.getNextLang(prevLang)
			i18n.changeLanguage(newLang)
			return { lang : newLang}
		})
	}

	getNextLang(lang) {
		return (lang === 'en' ? 'fr' : 'en' )
	}

	render() {
		const { t, i18n } = this.props
		const {burgerOpen, lang} = this.state
		let nextLang = this.getNextLang(lang)

		return (
			<div className="nav-container">
				<div className="nav">
					<Burger
						isOpen={burgerOpen}
						onClick={this.handleBurgerOpen}
					/>
					<div className="nav-logo">
						<img src="favicon.svg" alt="logo" />
						<h3>World&nbsp;of&nbsp;Warcraft&nbsp;Wiki</h3>
					</div>
					<div className="nav-spacer" />
					<div className="nav-links">
						<Link to="/characters">{t('characters.title')}</Link>

						<Link to="/mounts">{t('mounts.title')}</Link>

						<Link to="/pets">{t('pets.title')}</Link>
					</div>

					<div className="nav-lang">
						<button onClick={this.handleLangChange}>
							{nextLang}
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default withTranslation('common')(Nav)
