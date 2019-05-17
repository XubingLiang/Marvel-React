import React from 'react'
import { Media } from 'react-bootstrap'
import Divider from '@material-ui/core/Divider'
import '../../assets/css/home.css'

const renderItems = (heroComics) => {
  return (
    heroComics.map((comic) =>
      <div key={comic.id}>
        <Media as='li' style={{height: '140px'}}>
          <img
            width={90}
            height={120}
            className='mr-3'
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt='Generic placeholder'
          />
          <Media.Body style={{height: '140px'}}>
            <h5>{comic.title}</h5>
            <p className='comic-description'>
              {comic.description ? comic.description : 'No Descciption found.'}
            </p>
          </Media.Body>
        </Media>
        <Divider />
      </div>
    )
  )
}

const HeroComicsDetail = ({ heroComics }) => {
  return (
    <div>
      <ul className='list-unstyled'>
        {renderItems(heroComics)}
      </ul>
    </div>

  )
}

export default HeroComicsDetail
