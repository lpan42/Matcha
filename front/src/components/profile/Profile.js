import React, { useContext, useEffect } from 'react'
import UserContext from '../../contexts/user/userContext';
import ProfileContext from '../../contexts/profile/profileContext';
import Spinner from '../layout/Spinner';
import { makeStyles } from '@material-ui/core/styles';
import VisitProfile from './VisitProfile';
import MyProfile from './MyProfile';

const useStyles = makeStyles(()=> ({
    container: {
        height: "90vh",
        margin: "0",
        padding: "1rem 2rem",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display:"flex",
        flexDirection: "row",
        justifyContent:"center",
        alignContent:"center",
    },
  }));

const Profile = ({ match }) => {
    const  profileContext = useContext(ProfileContext);
    const  userContext = useContext(UserContext);
    const classes = useStyles();

    const { loading, getProfile, getInterestsList } = profileContext;
    const { loadUser, user} = userContext;
    
    useEffect(() => {
        loadUser();
        getInterestsList();
        getProfile(match.params.userid);
        // eslint-disable-next-line
    }, []);

    if (loading) return <Spinner />;

    return (
        <div className={classes.container}>
            {+match.params.userid === (user && user.data.id) ? 
                <MyProfile /> : 
                <VisitProfile userid={+match.params.userid}/>
            }
        </div>
    )
}

export default Profile
