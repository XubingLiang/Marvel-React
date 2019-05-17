import React from 'react'
import { Media } from 'react-bootstrap'
import Divider from '@material-ui/core/Divider'
import '../../assets/css/home.css'

const renderItems = (heroItems) => {
  return (heroItems.length === 0 ? <div>No Item Found </div>
    : heroItems.map((item) =>
      (<div key={item.id}>
        <Divider />
        <Media as='li' style={{height: '140px'}}>
          <a className='link' href={item.urls ? item.urls[0].url : ''} rel='noopener noreferrer' target='_blank'>
            <img
              width={100}
              height={130}
              className='mr-3'
              src={item.thumbnail ? `${item.thumbnail.path}.${item.thumbnail.extension}` : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'}
              alt='Generic placeholder'
            />
          </a>
          <Media.Body style={{height: '140px'}}>
            <h5 className='link'>
              <a href={item.urls ? item.urls[0].url : ''} rel='noopener noreferrer' target='_blank'>
                {item.title}
              </a>
            </h5>
            <p className='comic-description'>
              {item.description ? item.description : 'No Descciption found.'}
            </p>
          </Media.Body>
        </Media>
        <Divider />
      </div>)
    )
  )
}

const HeroComicsDetail = ({ heroItems }) => {
  return (
    <div>
      <ul className='list-unstyled'>
        {renderItems(heroItems)}
      </ul>
    </div>

  )
}

export default HeroComicsDetail
