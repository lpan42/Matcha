import React, {useContext, Fragment, useState,useEffect} from 'react'
import AlertContext from '../../contexts/alert/alertContext';
import ProfileContext from '../../contexts/profile/profileContext';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
  
const UploadPics = () => {
  const  alertContext = useContext(AlertContext);
  const  profileContext = useContext(ProfileContext);

  const { setAlert } = alertContext;
  const { profile, updateAvatar, error, success, clearMessage } = profileContext;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [pic, setPic] = useState(null);
  const [picName, setPicName] = useState(profile.data.picture ? profile.data.picture : null);
  const [src, setSrc] = useState(profile.data.picture ? `../images/${picName}` : null);

  useEffect(() => {
      if(error) {
          setAlert(error, 'danger');
          clearMessage();
      }
      if(success) {
          setAlert(success, 'success');
          clearMessage();
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
		setAlert("Only png/jpeg(jpg) is allowed", "danger");
	}
	const size = 2000000;
	if (file.size > size){
		handleClose();
		setAlert("File is too big", "danger");
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
      <div>
        <button type="button" className="btn btn-primary btn-sm" onClick={handleOpen}>
          Edit
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
      </div>
  );
}

export default UploadPics