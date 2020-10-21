import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import favicon from '../../assets/favicon.svg'

import Button from '@material-ui/core/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

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
      expand="lg"
      className="nav-container fixed-top"
      collapseOnSelect="true"
    >
      <Navbar.Brand>
        <img src={favicon} alt="logo" />
        <span>World&nbsp;of&nbsp;Warcraft&nbsp;Wiki</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav className="justify-content-end">
          <Nav.Link as={Link} className="nav-link" href="/mounts" to="/mounts">
            {t('mounts.title')}
          </Nav.Link>
          <Nav.Link as={Link} className="nav-link" href="/pets" to="/pets">
            {t('pets.title')}
          </Nav.Link>

          <Button
            onClick={handleLangChange}
            variant="contained"
            style={{ outline: 'none', width: 'fit-content', margin: '0 auto' }}
          >
            {getNextLang(lang)}
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
