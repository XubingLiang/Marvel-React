import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, CssBaseline } from '@material-ui/core';
import Pagination from "material-ui-flat-pagination";

import { getCharacters } from '../../actions/marvelAPI'

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

class GuttersGrid extends React.Component {
  state = {
    offset: 0,
    heroList: [],
  };

  componentDidMount() {
    this.loadCharacters(this.state.offset)
  }

  loadCharacters = (offset) => {
    getCharacters(offset)
    .then(res => {
      console.log(res)
    })
  }

  handleClick(offset) {
    this.loadCharacters(offset)
    this.setState({ offset });
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="center" spacing={16}>
            {[1, 2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(value => (
              <Grid key={value} item>
                <Paper className={classes.paper} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <CssBaseline />
        <div style={{textAlign: 'center', width: '100%'}}>
          <Pagination
            limit={1}
            size={'large'}
            offset={this.state.offset}
            total={100}
            onClick={(e, offset) => this.handleClick(offset)}
          />
        </div>
      </Grid>
    );
  }
}

GuttersGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GuttersGrid);