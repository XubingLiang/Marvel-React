import React from 'react'
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { withRouter } from 'react-router'
import Home from '../../components/Home'
import HeroPage from '../../components/HeroPage'

class PublicLayout extends React.Component {
  render () {
    const {offset, heroList, handleClick, loadCharacters, isLoading} = this.props
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={() => <Redirect to='pages/0' />} />
          <Route
            path='/pages/:offset'
            render={(routeProps) => (
              <Home
                offset={offset}
                heroList={heroList}
                handleClick={handleClick}
                loadCharacters={loadCharacters}
                isLoading={isLoading}
              />
            )}
          />
          <Route exact path='/heros/:id' component={HeroPage} />
        </Switch>
      </Router>
    )
  }
}

export default withRouter(PublicLayout)
