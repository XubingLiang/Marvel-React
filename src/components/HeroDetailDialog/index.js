import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Typography from '@material-ui/core/Typography'
import HeroDetailContent from './HeroDetailContent.js'
import loading from '../../assets/images/loading.svg'

class HeroDetailsDialog extends React.Component {
  render () {
    const {
      handleClose,
      heroDetailOpen,
      isLoadingHeroDetail,
      selectedHero
    } = this.props
    return (
      <div>
        <Dialog
          fullWidth
          maxWidth='sm'
          open={heroDetailOpen}
          onClose={handleClose}
          aria-labelledby='responsive-dialog-title'
        >
          {isLoadingHeroDetail ? <img src={loading} alt={'Loading...'} className='loading' />
            : <div>
              <DialogTitle disableTypography >
                <Typography variant='title'>
                  {`${selectedHero.name}`} | Detail
                </Typography>
              </DialogTitle>
              <DialogContent>
                <HeroDetailContent selectedHero={selectedHero} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color='primary' autoFocus>
                    Close
                </Button>
              </DialogActions>
            </div>
          }
        </Dialog>
      </div>
    )
  }
}

export default withMobileDialog()(HeroDetailsDialog)
