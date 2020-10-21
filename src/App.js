import React from 'react'

// Pages
import Mounts from './pages/mounts/Mounts'
import Pets from './pages/pets/Pets'

// Components
import Navigation from './components/Nav/Navigation'
import Footer from './components/Footer/Footer'

import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom'

import './App.css'
import { Badge } from 'react-bootstrap'

function App() {
  return (
    <div className="app">
      <Router>
        <Navigation />
        <div className="app-body">
          <Switch>
            <Route exact path="/" component={Mounts} />
            <Route path="/mounts" component={Mounts} />
            <Route path="/pets" component={Pets} />
            <Route path="*" component={NoMatch}/>
          </Switch>
        </div>
      </Router>
      <Footer/>
    </div>
  )
}

function NoMatch(){
  let location = useLocation()
  return (
    <div>
      <h4>
        No match for <Badge variant='dark'>{location.pathname}</Badge>
      </h4>
    </div>
  );
}

export default App
