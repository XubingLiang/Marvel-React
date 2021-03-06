import React from 'react'
import PropTypes from 'prop-types'
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase
} from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

import logo from '../../assets/images/logo.svg'
import '../../assets/css/home.css'

const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
})

function SearchAppBar (props) {
  const { classes, handleChangeFilter, handleKeyPress } = props
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <a href='/'><img className={classes.logo} src={logo} height={50} alt={'Marvel Heros'} /></a>
          <Typography className={classes.title} variant='h6' color='inherit' noWrap style={{marginLeft: '5px'}}>
            <div className='header'><a href='/'>Marvel Heros</a></div>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Start With.eg:Spider(case sensitive)'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              onChange={handleChangeFilter}
              onKeyPress={handleKeyPress}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SearchAppBar)
