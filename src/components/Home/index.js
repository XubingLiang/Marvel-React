import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { withRouter } from 'react-router'

import loading from '../../assets/images/loading.svg';
import HeroInfo from '../HeroInfo'
import PaginationComponent from '../PaginationComponent'
import '../../assets/css/home.css'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class Home extends React.Component {
  state = {
    heroDetailOpen: false,
    isLoadingHeroDetail: true,
    selectedHero: {},
  };

  componentDidMount() {
    this.props.loadCharacters(this.props.match.params.offset)
  }


  handleClickOpen = (heroID) => {
    this.props.history.push(`/heros/${heroID}`)
  };

  handleClose = () => {
    this.setState({ heroDetailOpen: false });
  };

  handleClickPagination = (offset) => {
    this.props.history.push(`/pages/${offset}`)
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
      heroList, 
      isLoading,
      offset
    } = this.props;
    return (
      <div className='content' >
        { isLoading ? <img src={loading} alt={'Loading...'} className='loading'/> :
          <div>
            <Grid container className={classes.root} >
              <Grid container justify="center" spacing={16} alignItems="baseline">
                {this.renderHeroList(heroList)}
              </Grid>
            </Grid>
            { heroList.length < 20 && offset === 0 ? null :
              <PaginationComponent 
                limit={1}
                size={'large'}
                offset={offset}
                total={75}
                handleClick={this.handleClickPagination}
              />
            }
          </div>
        }
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Home));