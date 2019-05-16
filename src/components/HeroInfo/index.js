import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    width: 345
  },
  media: {
    height: 300
  }
}

function HeroInfo (props) {
  const { classes, hero, handleClickOpen } = props
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <a href={hero.urls[1].url} rel='noopener noreferrer' target='_blank'>
          <CardMedia
            className={classes.media}
            image={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
            title={`${hero.name}`}
          />
        </a>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {hero.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary' onClick={() => handleClickOpen(hero.id)}>
          Read More
        </Button>
      </CardActions>
    </Card>
  )
}

HeroInfo.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HeroInfo)
