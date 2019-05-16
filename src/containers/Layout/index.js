import React from 'react'
import '../../assets/css/home.css'
import Header from '../../components/Header'
import Content from '../../components/Content'

class Layout extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <Content />
        <footer className='footer' >Data provided by Marvel. © 2019 MARVEL</footer>
      </div>
    )
  }
}

export default Layout
