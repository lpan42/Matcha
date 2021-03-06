import React, {useContext, Fragment, useState} from 'react'
import ProfileContext from '../../contexts/profile/profileContext';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      flexDirection:"column",
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      [theme.breakpoints.down('sm')]: {
        width:'80vw',
      },
      [theme.breakpoints.up('md')]: {
        width:'60vw',
      },
      [theme.breakpoints.up('lg')]: {
        width:'40vw',
      },
      backgroundColor: theme.palette.background.paper,
      // border: '1px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    preview: {
        // display: 'flex',
        maxHeight: "480px",
        objectFit: "contain",
        padding: theme.spacing(1),
    }
  }));
  
const UploadAvatars = () => {
  const  profileContext = useContext(ProfileContext);

  const { profile, updateAvatar } = profileContext;

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [pic, setPic] = useState(null);
  const [picName, setPicName] = useState(profile.data.avatar ? profile.data.avatar : null);
  const [src, setSrc] = useState(profile.data.avatar ? `${picName}` : null);

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
    const size = 3000000;
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
        <Button color="primary" size="small" style={{margin:"5px 0"}} onClick={handleOpen}>
        Edit Avatar
        </Button>
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
                {picName ? <img className={classes.preview} alt="upload Avatar" src={src}></img> : null}
              <form onSubmit={OnSubmit}>
                  <input type="file" name="uploadPic" accept=".jpg,.png" onChange={OnChange}></input>
                  <br></br>
                  <Button type="submit" color="primary" size="small" variant="contained">Change Avatar</Button>
              </form>
            </div>
          </Fade>
        </Modal>
      </Fragment>
  );
}

export default UploadAvatars