import React, { Component } from 'react'
import BlizzardAPI from './api/BlizzardAPI'

// Pages
import Characters from './pages/Characters'
import Mounts from './pages/Mounts'
import Pets from './pages/Pets'

// Components
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { accessToken: null }
    this.setAccessToken = this.setAccessToken.bind(this)
  }

  setAccessToken(token) {
    this.setState({ accessToken: token })
  }

  componentDidMount() {
    // Requesting access token for Blizzard API
    if (this.state.accessToken === null) {
      console.log('Requesting token ...')
      BlizzardAPI.getAccessToken(this.setAccessToken)
    }
  }

  render() {
    const { accessToken } = this.state
    return (
      <div className="app">
        <Router>
          <Nav />
          <div className="app-body">
            <Switch>
              <Route exact path="/" component={Characters} />
              <Route path="/characters" component={Characters} />
              <Route
                path="/mounts"
                render={(props) => <Mounts {...props} token={accessToken} />}
              />
              <Route path="/pets" component={Pets} />
            </Switch>
          </div>
        </Router>

        <Footer />
      </div>
    )
  }
}

export default App
