import React, { useContext } from 'react'
import ProfileContext from '../../contexts/profile/profileContext';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import toUpperCase from '../../utils/toUpperCase';

const ReportFake = ({show, handleClose}) => {
    const  profileContext = useContext(ProfileContext);
    const { profile, reportFake } = profileContext;

    const BlockUser = () => {
        reportFake(profile.data.id_user);
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
            <DialogTitle id="alert-dialog-title">{`Are you sure to report ${toUpperCase(profile.data.firstname)} ${toUpperCase(profile.data.lastname)} as a fake account?`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                If you report this user as a fake account, you will be considered as block this user. 
                If there are more than 5 users that report the same account as a fake account, this account will be deleted permanently. 
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={BlockUser} color="primary">
                Report As Fake Account
              </Button>
              <Button onClick={handleClose} color="primary">
                cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default ReportFake