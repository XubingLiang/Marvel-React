import React from 'react'
import { Media } from 'react-bootstrap'
import Divider from '@material-ui/core/Divider'
import '../../assets/css/home.css'

const renderItems = (heroComics) => {
  return (
    heroComics.map((comic) =>
      <div key={comic.id}>
        <Divider />
        <Media as='li' style={{height: '140px'}}>
          <a className='link' href={comic.urls[0].url} rel='noopener noreferrer' target='_blank'>
            <img
              width={100}
              height={130}
              className='mr-3'
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt='Generic placeholder'
            />
          </a>
          <Media.Body style={{height: '140px'}}>
            <h5 className='link'>
              <a href={comic.urls[0].url} rel='noopener noreferrer' target='_blank'>
                {comic.title}
              </a>
            </h5>
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
