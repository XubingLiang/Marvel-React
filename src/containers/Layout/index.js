import React from 'react'
import '../../assets/css/layout.css'
import Header from '../../components/Header'
import Content from '../../components/Content'
import { getCharacters } from '../../actions/marvelAPI';

class Layout extends React.Component {
  state = {
    searchText: '',
    offset: 0,
    heroList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.loadCharacters(this.state.offset)
  }

  loadCharacters = (offset) => {
    getCharacters(offset, this.state.searchText)
      .then(res => {
        this.setState({ heroList: res.data.results, isLoading: false })
      })
      .catch(err => {
        this.setState({ heroList: [], isLoading: false })
        console.log(err)
      })
  }

  handleClick = (offset) => {
    this.setState({ isLoading: true });
    console.log(this.state.searchText)
    this.loadCharacters(offset)
    this.setState({ offset: offset });
  }

  handleChangeFilter = (e) => {
    this.setState({ searchText: e.target.value })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter'){
      e.preventDefault()
      this.setState({ 
        isLoading: true,
        searchText: e.target.value,
        offset: 0
      });
      getCharacters(this.state.offset, e.target.value)
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
      offset,
    } = this.state
    return (
      <div>
        <Header 
          handleChangeFilter={this.handleChangeFilter}
          handleKeyPress={this.handleKeyPress}
        />
        <Content 
          offset={offset}
          isLoading={isLoading}
          heroList={heroList}
          handleClick={this.handleClick}
        />
        <footer className='footer' >Data provided by Marvel. © 2019 MARVEL</footer>
      </div>
    )
  }
}

export default Layout
