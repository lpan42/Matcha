import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import validateToken from '../../utils/validateToken';
import io from 'socket.io-client';

let socket;

const UnblockComfirm = ({show, handleClose, blockUserId, blockUserFirstname, blockUserLastname, success}) => {
    if(!socket){
      socket = io.connect(':8000');
  }

    const unblockUser = async (blockUserId) => {
        setAuthToken(localStorage.token);
        const loginUser = validateToken(localStorage.token);
        try{
            const result =  await axios.post(`/user/unblock/${blockUserId}`);
            success(result.data.success);
            if(loginUser != blockUserId){
              let data = {
                  notification: 'unblocks',
                  id_user: blockUserId,
                  id_sender: loginUser
              }
              socket.emit('addNotif', data);
          }
        }catch(err){
            console.log(err);
        }
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
            <DialogTitle id="alert-dialog-title">{`Are you sure to unblock ${blockUserFirstname} ${blockUserLastname} ?`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Once you unblock this user, you can visit and get notification from and  this user.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => unblockUser(blockUserId)} color="primary">
                Confirm to unblock
              </Button>
              <Button onClick={handleClose} color="primary">
                cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default UnblockComfirm