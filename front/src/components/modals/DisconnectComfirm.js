import React,{ useContext } from 'react'
import ProfileContext from '../../contexts/profile/profileContext';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import toUpperCase from '../../utils/toUpperCase';

const DisconnectComfirm = ({show, handleClose}) => {
    const  profileContext = useContext(ProfileContext);

    const { profile, unLike } = profileContext;

    const DisconnectUser = () => {
        unLike(profile.data.id_user);
        handleClose();
    }

    return (
        <div>
          <Dialog
            open={show}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{`Are you sure to disconnect with ${toUpperCase(profile.data.firstname)} ${toUpperCase(profile.data.lastname)}?`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Once you unlike (disconnect with) this user, all your chat messages will be deleted and you cannot get them back.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={DisconnectUser} color="primary">
                Confirm to disconnect
              </Button>
              <Button onClick={handleClose} color="primary">
                cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default DisconnectComfirm