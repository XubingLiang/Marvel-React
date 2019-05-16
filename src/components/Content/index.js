import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Pagination from "material-ui-flat-pagination";

import '../../assets/css/content.css'
import loading from '../../assets/images/loading.svg';
import { getCharacters, getCharacterDetail } from '../../actions/marvelAPI';
import HeroInfo from '../HeroInfo'
import HeroDetailDialog from '../HeroDetailDialog'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 300,
    width: 200,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class Content extends React.Component {
  state = {
    offset: 0,
    heroList: [],
    isLoading: true,
    heroDetailOpen: false,
    isLoadingHeroDetail: true,
    selectedHero: {},
  };

  componentDidMount() {
    this.loadCharacters(this.state.offset)
  }

  loadCharacters = (offset) => {
    getCharacters(offset)
      .then(res => {
        this.setState({ heroList: res.data.results, isLoading: false })
      })
  }

  handleClickOpen = (heroID) => {
    this.setState({ heroDetailOpen: true, isLoadingHeroDetail: true });
    getCharacterDetail(heroID)
      .then(res => {
        this.setState({
          isLoadingHeroDetail: false,
          selectedHero: res.data.results[0]
        })
      })
  };

  handleClose = () => {
    this.setState({ heroDetailOpen: false });
  };

  handleClick(offset) {
    this.setState({ isLoading: true });
    this.loadCharacters(offset)
    this.setState({ offset: offset });
  }

  renderHeroList = (heroList) => {
    return (heroList.map(hero => (
      <Grid key={hero.id} item>
        <HeroInfo hero={hero} handleClickOpen={() => this.handleClickOpen(hero.id)}/>
      </Grid>
    )))
  }

  render() {
    const { classes } = this.props;
    const { 
      heroList, 
      isLoading, 
      heroDetailOpen,
      isLoadingHeroDetail,
      selectedHero
    } = this.state;
    return (
      <div className='content' >
        <HeroDetailDialog 
          handleClose = {this.handleClose} 
          heroDetailOpen = {heroDetailOpen}
          isLoadingHeroDetail= {isLoadingHeroDetail}
          selectedHero = {selectedHero}
        />
        { isLoading ? <img src={loading} alt={'Loading...'} className='loading'/> :
          <Grid container className={classes.root} justify="center" spacing={16}>
            {this.renderHeroList(heroList)}
            <div className='pagination'>
              <Pagination
                limit={1}
                size={'large'}
                offset={this.state.offset}
                total={75}
                onClick={(e, offset) => this.handleClick(offset)}
              />
            </div>
          </Grid>
        }
      </div>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);