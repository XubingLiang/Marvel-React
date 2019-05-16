import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Badge from 'react-bootstrap/Badge'

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100,
    borderRadius: 4
  }
})

const getTargetUrl = (urls, type) => {
  let results = urls.filter((url) => url.type === type)
  if (results.length !== 0) {
    return results[0].url
  } else {
    return 'https://www.marvel.com/explore'
  }
}

function HeroDetailContent (props) {
  const { classes, selectedHero } = props
  return (
    <div>
      <div >
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <Avatar
              alt={selectedHero.name}
              src={`${selectedHero.thumbnail.path}.${selectedHero.thumbnail.extension}`}
              className={classes.bigAvatar}
            />
          </Grid>
          <Grid item xs={8}>
            <List dense>
              <ListItem>
                <Link href={getTargetUrl(selectedHero.urls, 'detail')} rel='noopener noreferrer' target='_blank' >
                  More Detail
                </Link>
              </ListItem>
              <ListItem>
                <Link href={getTargetUrl(selectedHero.urls, 'wiki')} rel='noopener noreferrer' target='_blank'>
                  Marvel Wiki
                </Link>
              </ListItem>
              <ListItem>
                <Link href={getTargetUrl(selectedHero.urls, 'comiclink')} rel='noopener noreferrer' target='_blank'>
                  Comics Detail
                </Link>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </div>
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Description</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {selectedHero.description ? selectedHero.description : 'No Description Found, You can check on the Marvel Official Website'}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Other Information</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>

              <Badge pill variant='success'>
                {`Commics ${selectedHero.comics.available}`}
              </Badge>
              <br />
              <Badge pill variant='success'>
                {`Series ${selectedHero.series.available}`}
              </Badge>
              <br />
              <Badge pill variant='success'>
                {`Stories ${selectedHero.stories.available}`}
              </Badge>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </div>
  )
}

HeroDetailContent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HeroDetailContent)
