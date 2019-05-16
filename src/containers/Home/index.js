import React from 'react'
import '../../assets/css/home.css'
import Header from '../../components/Header'
import Content from '../../components/Content'

class Home extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <div className='content'>
          <Content />
        </div>
        <footer className='footer' >Data provided by Marvel. © 2019 MARVEL</footer>
      </div>
    )
  }
}

export default Home
