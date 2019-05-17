import React from 'react'
import { Media, Container, Row, Col } from 'react-bootstrap'
import '../../assets/css/home.css'

const getTargetUrl = (urls, type) => {
  let results = urls.filter((url) => url.type === type)
  if (results.length === 1) {
    return results[0].url
  } else {
    return 'https://www.marvel.com/explore'
  }
}

const HeroDescription = ({ heroInfo }) => {
  return (
    <div className='hero-description'>
      <Media>
        <img
          width={200}
          height={200}
          className='mr-3'
          src={`${heroInfo.thumbnail.path}.${heroInfo.thumbnail.extension}`}
          alt='Generic placeholder'
        />
        <Media.Body style={{height: '140px'}}>
          <h5>{heroInfo.name}</h5>
          <p className='paragraph'>
            {heroInfo.description ? heroInfo.description : 'No Description Found, You can check on Marvel Official Website'}
          </p>
          <Container>
            <Row>
              <Col className='link'>
                <a href={getTargetUrl(heroInfo.urls, 'detail')} rel='noopener noreferrer' target='_blank'>
                    More Detail
                </a>
              </Col>
              <Col className='link'>
                <a href={getTargetUrl(heroInfo.urls, 'wiki')} rel='noopener noreferrer' target='_blank'>
                    Marvel Wiki
                </a>
              </Col>
              <Col className='link'>
                <a href={getTargetUrl(heroInfo.urls, 'comiclink')} rel='noopener noreferrer' target='_blank'>
                    More Comics
                </a>
              </Col>
            </Row>
          </Container>
        </Media.Body>
      </Media>
    </div>

  )
}

export default HeroDescription
