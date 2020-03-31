import React, {useContext, Fragment, useState,useEffect} from 'react'
import ProfileContext from '../../contexts/profile/profileContext';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    preview: {
        display: 'flex',
        height: 200,
        width: 180,
        padding: theme.spacing(1),
    }
  }));
  
const UploadAvatars = () => {
  const  profileContext = useContext(ProfileContext);

  const { profile, updateAvatar, error, success } = profileContext;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [pic, setPic] = useState(null);
  const [picName, setPicName] = useState(profile.data.avatar ? profile.data.avatar : null);
  const [src, setSrc] = useState(profile.data.avatar ? `../images/${picName}` : null);

  useEffect(() => {
    if(error) {
      toast.error(error);
    }
    if(success) {
        toast.success(success);
    }
      // eslint-disable-next-line
  }, [error, success]);

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const checkPic = (file) => {
    const types = ['image/png', 'image/jpeg'];
    if (types.every(type => file.type !== type)){
      handleClose();
      toast.error("Only png/jpeg(jpg) is allowed");
    }
    const size = 2000000;
    if (file.size > size){
      handleClose();
      toast.error("File is too big");
    }
    return (true);
  }

  const OnChange = (e) => {
    if(checkPic(e.target.files[0])){
      setPic(e.target.files[0]);
      setSrc(URL.createObjectURL(e.target.files[0]));
      setPicName(e.target.files[0].name);
    }
  }

  const OnSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', pic);
    updateAvatar(formData);
    handleClose();
  }

  return (
      <Fragment>
        <button type="button" className="btn btn-primary btn-sm" onClick={handleOpen}>
        Edit Avatar
        </button>
        <Modal
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
                <div>preview</div>
                {picName ? <img className={classes.preview} src={src}></img> : null}
              <form onSubmit={OnSubmit}>
                  <input type="file" name="uploadPic" accept=".jpg,.png" onChange={OnChange}></input>
                  <input type="submit" value="Change Profile Photo" className="btn btn-primary btn-block" />
              </form>
            </div>
          </Fade>
        </Modal>
      </Fragment>
  );
}

export default UploadAvatars