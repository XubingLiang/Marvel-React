import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Badge from 'react-bootstrap/Badge'

import { getCharacterDetail, getCharacterItems } from '../../actions/marvelAPI';
import HeroDescription from './HeroDescription';
import HeroItemsDetail from './HeroItemsDetail';
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
    heroSeries: [],
    isLoading: true,
  }

  componentDidMount() {
    const heroID = this.props.match.params.id
    this.loadCharacterDetail(heroID)
  }

  loadCharacterDetail = (heroID) =>{
    Promise.all([
      getCharacterDetail(heroID),
      getCharacterItems(heroID, 'comics'),
      getCharacterItems(heroID, 'series'),
    ])
    .then(values => {
      this.setState(prevState => {
        const [heroDetail, comics, series] = values
        return {
          heroInfo: heroDetail.data.results[0],
          heroComics: comics.data.results,
          heroSeries: series.data.results,
          isLoading: false,
        }
      })
      console.log(this.state.heroSeries)
    })
  }

  render () {
    const { classes } = this.props
    const { heroInfo, heroComics, isLoading, heroSeries } = this.state
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
                <HeroItemsDetail heroItems={heroComics}/>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Series</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <HeroItemsDetail heroItems={heroSeries}/>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Other Information</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  <Badge pill variant='success'>
                    {`Commics ${heroInfo.comics.available}`}
                  </Badge>
                  <br />
                  <Badge pill variant='success'>
                    {`Series ${heroInfo.series.available}`}
                  </Badge>
                  <br />
                  <Badge pill variant='success'>
                    {`Stories ${heroInfo.stories.available}`}
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
