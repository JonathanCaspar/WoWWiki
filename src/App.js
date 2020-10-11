import React from 'react'

// Pages
import Characters from './pages/characters/Characters'
import Mounts from './pages/mounts/Mounts'
import Pets from './pages/pets/Pets'

// Components
import Navigation from './components/Nav/Navigation'
import Footer from './components/Footer/Footer'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css'

function App() {
  return (
    <div className="app">
      <Router>
        <Navigation />
        <div className="app-body">
          <Switch>
            <Route exact path="/" component={Mounts} />
            <Route path="/characters" component={Characters} />
            <Route path="/mounts" component={Mounts} />
            <Route path="/pets" component={Pets} />
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  )
}

export default App
