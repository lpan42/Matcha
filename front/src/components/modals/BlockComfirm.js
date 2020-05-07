import React, { useContext } from 'react'
import ProfileContext from '../../contexts/profile/profileContext';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import toUpperCase from '../../utils/toUpperCase';

const BlockComfirm = ({show, handleClose}) => {
    const  profileContext = useContext(ProfileContext);

    const { profile, blockUser } = profileContext;

    const BlockUser = () => {
        blockUser(profile.data.id_user);
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
            <DialogTitle id="alert-dialog-title">{`Are you sure to block ${toUpperCase(profile.data.firstname)} ${toUpperCase(profile.data.lastname)}?`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Once you block this user, you cannot get any notification about this user and also cannot search or visit this user.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={BlockUser} color="primary">
                Confirm to block
              </Button>
              <Button onClick={handleClose} color="primary">
                cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default BlockComfirm