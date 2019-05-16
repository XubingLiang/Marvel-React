import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Pagination from "material-ui-flat-pagination";

import '../../assets/css/content.css'
import loading from '../../assets/images/loading.svg';
import { getCharacterDetail } from '../../actions/marvelAPI';
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
    heroDetailOpen: false,
    isLoadingHeroDetail: true,
    selectedHero: {},
  };



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

  handleClickPagination(offset) {
    this.props.handleClick(offset)
  };

  renderHeroList = (heroList) => {
    return ( heroList.length === 0 ? <Grid item>No Recod Found</Grid>
      :(heroList.map(hero => (
      <Grid key={hero.id} item>
        <HeroInfo hero={hero} handleClickOpen={() => this.handleClickOpen(hero.id)}/>
      </Grid>)
    )))
  }

  render() {
    const { 
      classes, 
      offset,
      heroList, 
      isLoading, 
    } = this.props;
    const { 
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
          <div>
            <Grid container className={classes.root} justify="center" spacing={16}>
              {this.renderHeroList(heroList)}
            </Grid>
            { heroList.length < 20 && offset === 0 ? null :
             <div className='paginate'>
                <Pagination
                  limit={1}
                  size={'large'}
                  offset={offset}
                  total={75}
                  onClick={(e, offset) => this.handleClickPagination(offset)}
                />
              </div>
            }
          </div>
        }
      </div>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);