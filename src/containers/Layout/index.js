import React from 'react'
import {
  HashRouter as Router,
} from 'react-router-dom'
import { withRouter } from 'react-router'

import '../../assets/css/layout.css'
import Header from '../../components/Header'
import PublicLayout from './PublicLayout'
import { getCharacters } from '../../actions/marvelAPI';

class Layout extends React.Component {
  state = {
    searchText: '',
    heroList: [],
    isLoading: true,
    offset: 0,
  }

  loadCharacters = (offset) => {
    this.setState({ isLoading: true })
    getCharacters(offset, this.state.searchText)
      .then(res => {
        this.setState({ heroList: res.data.results, isLoading: false, offset: offset })
      })
      .catch(err => {
        this.setState({ heroList: [], isLoading: false, offset: offset })
        console.log(err)
      })
  }

  handleClick = (offset) => {
    this.setState({ isLoading: true, offset: offset });
    this.loadCharacters(offset)
  }

  handleChangeFilter = (e) => {
    this.setState({ searchText: e.target.value })
  }

  handleKeyPress = (e) => {
    const offset = this.props.match.params.offset
    if (e.key === 'Enter'){
      this.props.history.push(`/pages/0`)
      e.preventDefault()
      this.setState({ 
        isLoading: true,
        searchText: e.target.value,
        offset: 0
      });
      getCharacters(offset, e.target.value)
        .then(res => {
          this.setState({ heroList: res.data.results, isLoading: false })
        })
        .catch(err => {
          this.setState({ heroList: [], isLoading: false })
          console.log(err)
        })        
    }
  }

  render () {
    const {
      isLoading,
      heroList,
      offset
    } = this.state
    return (
      <Router>
        <div>
          <Header 
            handleChangeFilter={this.handleChangeFilter}
            handleKeyPress={this.handleKeyPress}
          />
          <PublicLayout 
            offset={offset}
            isLoading={isLoading}
            heroList={heroList}
            handleClick={this.handleClick}
            loadCharacters={this.loadCharacters}
          />
          <footer className='footer' >Data provided by Marvel. © 2019 MARVEL</footer>
        </div>
      </Router>
    )
  }
}

export default withRouter(Layout)
