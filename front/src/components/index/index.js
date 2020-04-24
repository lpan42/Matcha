//rce from es7 react extension
import React, { useContext, useEffect, useState, } from 'react'
import UserContext from '../../contexts/user/userContext';
import Spinner from '../layout/Spinner';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import calculateAge from '../../utils/calculateAge';
import toUpperCase from '../../utils/toUpperCase';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CakeIcon from '@material-ui/icons/Cake';
import WcIcon from '@material-ui/icons/Wc';

const useStyles = makeStyles((theme) => ({
  card: {
    // padding: theme.spacing(1),
    maxWidth: 300,
  },
  media: {
    height: 180,
  },
}));

const Index = () => {
  const userContext = useContext(UserContext);

  const {loadUser} = userContext;
  
  const classes = useStyles();
  const suggestUser = [];

  const [searchUserInput, setSearchUserInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = async () => {
    setAuthToken(localStorage.token);
    try{
        const result =  await axios.get('/index/getsuggestions');
        setSuggestions(result.data.data);
        setLoading(false);
    }catch(err){
        console.log(err);
    }
  }

  const searchUser = async () => {
    setAuthToken(localStorage.token);
    try{
        const result =  await axios.get(`/index/search/${searchUserInput}`);
        setSuggestions(result.data.data);
        setLoading(false);
    }catch(err){
        console.log(err);
    }
  }

  useEffect(() => {
    loadUser();
    getSuggestions();
    //eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  const OnClick = (e) => {
    e.preventDefault();
    if(searchUserInput)
      searchUser();
    else
      getSuggestions();
  }

  if(suggestions.length){
    suggestions.map((suggestion, key) => {
      suggestUser.push(
        <Grid item xs key={key}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={suggestion.avatar? `../images/${suggestion.avatar}`: '../images/default_avatar'}
            />
            <CardContent>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <Typography variant="overline" component="p">{suggestion.username}</Typography>
                <Typography variant="caption" component="p"><i className="fas fa-star" style={{color:"var(--primary-color)"}}></i>{suggestion.fame}</Typography>
              </div>
              <Typography variant="subtitle2" component="span">
                {toUpperCase(suggestion.firstname)+" "+toUpperCase(suggestion.lastname)}
              </Typography>
              {suggestion.gender ? 
                <i className="fas fa-male" style={{color:"var(--primary-color)",paddingLeft:"5px"}}></i> : 
                <i className="fas fa-female" style={{color:"var(--primary-color)",paddingLeft:"5px"}}></i>}
              <Typography variant="caption" component="p"></Typography>
              <Typography variant="caption" component="p"><LocationOnIcon fontSize="small" color="primary"/>(city)</Typography>
              <Typography variant="caption" component="p"><WcIcon fontSize="small" color="primary"/>{toUpperCase(suggestion.sex_prefer)}</Typography>
              <Typography variant="caption" component="p"><CakeIcon fontSize="small" color="primary"/>{calculateAge(suggestion.birthday)}</Typography>
            </CardContent>
            <Button size="small" color="primary" href={`/profile/${suggestion.id_user}`}>Visit Profile</Button>
          </Card>
        </Grid>
      );
    });
  }

  return (
    <div>
      <form style={{display:"flex", float:"right", margin:"10px"}}>
        <TextField placeholder='Search Users'
          value={searchUserInput} onChange={e=>setSearchUserInput(e.target.value)}
        />
        <IconButton type='submit' size="small" color="primary" onClick={(e)=>OnClick(e)}>
          <SearchIcon fontSize="small"/>
        </IconButton>
      </form>
      <Grid container spacing={2}>
        {suggestions.length ? suggestUser : null}
      </Grid>
      
    </div>
  )
}

export default Index
