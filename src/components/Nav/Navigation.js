import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import favicon from '../../assets/favicon.svg'

//import './Nav.css'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Spinner from 'react-bootstrap/Spinner'

function Navigation() {
  const [lang, setLang] = useState('en')
  const { t, i18n } = useTranslation('common')

  const handleLangChange = () => {
    let newLang = getNextLang(lang)
    i18n.changeLanguage(newLang)
    setLang(newLang)
  }

  const getNextLang = (lang) => {
    if (lang) return lang === 'en' ? 'fr' : 'en'
    else return ''
  }

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="sm"
      className="nav-container section"
    >
      <Navbar.Brand>
        <img src={favicon} alt="logo" />
        <span>World&nbsp;of&nbsp;Warcraft&nbsp;Wiki</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav className="justify-content-end">
          <Link className="nav-link" to="/mounts">
            {t('mounts.title')}
          </Link>
          <Link className="nav-link" to="/characters">
            {t('characters.title')}
          </Link>
          <Link className="nav-link" to="/pets">
            {t('pets.title')}
          </Link>

          <Button onClick={handleLangChange}>{getNextLang(lang)}</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
