import React, { Fragment, useContext, useState, useEffect, Children }from 'react'
import ProfileContext from '../../contexts/profile/profileContext';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        flexDirection:'row',
        flexFlow: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    deleteBtn: {
        position: 'absolute',
        display: 'flex',
        top: 2,
        right: 2,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        height: 200, 
        width: 180,
        margin: theme.spacing(0.5),
    },
    buttons: {
        margin: theme.spacing(0.5),
    },
    input: {
      display: 'none',
    },
  }));

const EditPictures = () => {
    const  profileContext = useContext(ProfileContext);
  
    const { profile } = profileContext;
    const classes = useStyles();

    const [profilePictures, setProfilePictures] = useState(profile.data.pictures);
    const [showDelete, setShowDelete] = useState(false);

    let pictures = [];

    useEffect(() => {
        profile && (profile.data.pictures = profilePictures);
    }, [profilePictures]);
    
    const checkPic = (file) => {
        const types = ['image/png', 'image/jpeg'];
        if(types.every(type => file.type !== type)) {
            toast.error("Only png/jpeg(jpg) is allowed");
            return(false);
        };
        const size = 4000000;
        if (file.size > size) {
            toast.error("File is too big");
            return(false);
        };
        return (true);
    }

    const OnChange =(e) => {
        if(checkPic(e.target.files[0])){
            setProfilePictures(profilePictures.concat({file: e.target.files[0]}));
        }
    }
    
    const showDeleteBtn = () => {
        setShowDelete(true);
    } 

    const deletePic = (e) => {
        e.preventDefault();
        profilePictures.splice(e.currentTarget.id, 1);
        setShowDelete(false);
    }

    profilePictures.map((picture, index) => {
        if(picture.path){
            pictures.push(
                <div className={classes.imageContainer} key={index}>
                    <img className={classes.image} src={`../images/${picture.path}`}></img>
                    {showDelete ? <DeleteIcon className={classes.deleteBtn} id={index} color="primary" onClick={deletePic}/>: null}
                </div>
            );
        }
        else if(picture.file){
            pictures.push(
                <div className={classes.imageContainer} key={index}>
                    <img className={classes.image} src={URL.createObjectURL(picture.file)}></img>
                    {showDelete ? <DeleteIcon className={classes.deleteBtn} id={index} color="primary" onClick={deletePic}/>: null}
                </div>
            );
        }
    })


    return (
        <Fragment>
            <div className={classes.root}>
                { pictures }
            </div>
            {pictures.length < 4 ?
            <Fragment>
                <input accept=".jpg,.png" className={classes.input} id="contained-button-file" type="file" onChange={OnChange}/>
                <label htmlFor="contained-button-file"><Button className={classes.buttons} variant="contained" color="primary" component="span">+</Button></label>
            </Fragment> : null}
            { pictures.length === 0 ? null : <Button className={classes.buttons} variant="contained" color="primary" component="span" onClick={showDeleteBtn}>-</Button> }
        </Fragment>
    )
}

export default EditPictures