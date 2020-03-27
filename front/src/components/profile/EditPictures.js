import React, { Fragment, useContext, useState, useEffect, Children }from 'react'
import ProfileContext from '../../contexts/profile/profileContext';
import AlertContext from '../../contexts/alert/alertContext';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

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
    const  alertContext = useContext(AlertContext);

    const { setAlert } = alertContext;
    const { profile } = profileContext;
    const classes = useStyles();

    const [profilePictures, setProfilePictures] = useState(profile.data.pictures);
    const [newSrcs, setNewSrcs] = useState([]);
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        profile && (profile.data.pictures = profilePictures);
    }, [profilePictures]);

    let pictures = [];
    let newPics = [];

    const checkPic = (file) => {
        const types = ['image/png', 'image/jpeg'];
        if(types.every(type => file.type !== type)) {
            setAlert("Only png/jpeg(jpg) is allowed", "danger");
            return(false);
        };
        const size = 2000000;
        if (file.size > size) {
            setAlert("File is too big", "danger");
            return(false);
        };
        return (true);
    }

    const OnChange =(e) => {
        if(checkPic(e.target.files[0])){
            setNewSrcs(newSrcs.concat({src: URL.createObjectURL(e.target.files[0])}));
            setProfilePictures(profilePictures.concat({file: e.target.files[0]}));
        }
        // console.log(profilePictures)
    }

    const showDeleteBtn = () => {
        setShowDelete(true);
        // console.log(profilePictures)
    } 

    const deletePic = (e) => {
        console.log(e.currentTarget.id)
        // e.preventDefault()
        // console.log(profilePictures)
        // console.log(newSrcs)
        // setNewSrcs(newSrcs.splice(e.currentTarget.id-profilePictures.length))
        console.log(profilePictures[e.currentTarget.id])
        setProfilePictures(profilePictures.splice(e.currentTarget.id, 1));
        console.log(profilePictures)
    }

    profilePictures.map((picture, key) => {
        // console.log(profilePictures)
        if(picture.path){
            pictures.push(
                <div className={classes.imageContainer} key={key}>
                    <img className={classes.image} src={`../images/${picture.path}`}></img>
                    {showDelete ? <DeleteIcon className={classes.deleteBtn} id={key} color="primary" onClick={deletePic}/>: null}
                </div>
            );
        }
    })
 
    newSrcs.map((newSrc, key) => {
        // console.log("render newpic")
        let newId = pictures.length + newPics.length;
        newPics.push(
            <div className={classes.imageContainer} key={key}>
                <img className={classes.image} src={newSrc.src}></img>
                {showDelete ? <DeleteIcon className={classes.deleteBtn} id={newId} color="primary" onClick={deletePic}/>: null}
            </div>
        );
    })

    let count_picture = pictures.length + newSrcs.length;
    
    return (
        <Fragment>
            <div className={classes.root}>
                { pictures }
                { newPics }
            </div>
            {count_picture < 4 ?
            <Fragment>
                <input accept=".jpg,.png" className={classes.input} id="contained-button-file" type="file" onChange={OnChange}/>
                <label htmlFor="contained-button-file"><Button className={classes.buttons} variant="contained" color="primary" component="span">+</Button></label>
            </Fragment> : null}
            { pictures.length === 0 ? null : <Button className={classes.buttons} variant="contained" color="primary" component="span" onClick={showDeleteBtn}>-</Button> }
        
        </Fragment>
    )
}

export default EditPictures