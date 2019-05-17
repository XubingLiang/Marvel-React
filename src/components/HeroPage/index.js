import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Badge from 'react-bootstrap/Badge'

import { getCharacterDetail, getCharacterComics } from '../../actions/marvelAPI';
import HeroDescription from './HeroDescription';
import HeroComicsDetail from './HeroComicsDetail';
import loading from '../../assets/images/loading.svg';
import '../../assets/css/home.css'

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  bigAvatar: {
    margin: 5,
    width: 200,
    height: 200,
    borderRadius: 4
  },
  description: {
    margin: '0 0 10px 0',
  },
})



class HeroPage extends React.Component {
  state = {
    heroInfo: null,
    heroComics: [],
    isLoading: true,
  }

  componentDidMount() {
    const heroID = this.props.match.params.id
    this.loadCharacterDetail(heroID)
  }

  loadCharacterDetail = (heroID) =>{
    Promise.all([
      getCharacterDetail(heroID),
      getCharacterComics(heroID),
    ])
    .then(values => {
      this.setState(prevState => {
        const [heroDetail, comics] = values
        return {
          heroInfo: heroDetail.data.results[0],
          heroComics: comics.data.results,
          isLoading: false,
        }
      })
    })
  }

  render () {
    const { classes } = this.props
    const { heroInfo, heroComics, isLoading } = this.state
    return (
      <div className='hero-page'>
      { isLoading ? <img src={loading} alt={'Loading...'} className='loading'/> :
        (<div>
          <HeroDescription heroInfo={heroInfo} />
          <div className={classes.root}>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Comics</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <HeroComicsDetail heroComics={heroComics}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Other Information</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  <Badge pill variant='success'>
                    {`Commics ${111}`}
                  </Badge>
                  <br />
                  <Badge pill variant='success'>
                    {`Series ${111}`}
                  </Badge>
                  <br />
                  <Badge pill variant='success'>
                    {`Stories ${111}`}
                  </Badge>
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </div>
        )
      }
      </div>
    )
  }
}

HeroPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HeroPage)
