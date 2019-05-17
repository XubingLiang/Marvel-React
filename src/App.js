import React from 'react'
import {
  HashRouter as Router
} from 'react-router-dom'
import Layout from './containers/Layout'

function App () {
  return (
    <div className='App'>
      <Router>
        <Layout />
      </Router>
    </div>
  )
}

export default App
