//rce from es7 react extension
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../contexts/user/userContext';
import Spinner from '../layout/Spinner';
import Filter from './Filter';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import calculateAge from '../../utils/calculateAge';
import toUpperCase from '../../utils/toUpperCase';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CakeIcon from '@material-ui/icons/Cake';
import WcIcon from '@material-ui/icons/Wc';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { getDistance } from 'geolib';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 280,
    height: 380,
    margin: theme.spacing(2),
  },
  media: {
    height: 180,
  },
}));

const Index = () => {
  const userContext = useContext(UserContext);

  const {loadUser, user,token} = userContext;
  const history = useHistory();

  const classes = useStyles();
  const suggestUser = [];

  const [searchUserInput, setSearchUserInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [sort, setSort] = useState(null);

  const getSuggestions = async () => {
    setAuthToken(localStorage.token);
    try{
        const result =  await axios.get('/index/getsuggestions');
        setSuggestions(result.data.data);
        setSort("fameDesc");
        setLoading(false);
    }catch(err){
        console.log(err);
    }
  }

  const myTrim = (x) => {
    const replaced = x.replace(/[^\w0-9- ]+/ ,'') === '' ? '*' : x.replace(/[^\w0-9- ]+/ ,'');
    return replaced;
  }

  const searchUser = async () => {
    setAuthToken(localStorage.token);
    const searchInputTrim = myTrim(searchUserInput);
    try{
        const result =  await axios.get(`/index/search/${searchInputTrim}`);
        setSuggestions(result.data.data);
        setSort("fameDesc");
        setLoading(false);
    }catch(err){
        console.log(err);
    }
  }

  useEffect(() => {
    loadUser();
    if(!token && !user){
       history.push('/register');
    }
    getSuggestions();
    //eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  const OnClick = (e) => {
    e.preventDefault();
    if(searchUserInput){
      setLoading(true);
      searchUser();
    }
    else{
      setLoading(true);
      getSuggestions();
      console.log(user);
    }
  }

  const sortingDesc = (obj1, obj2, key) => {
    if (obj1[key] > obj2[key])
      return -1;
    if (obj1[key] < obj2[key])
      return 1;
    return 0;
  }

  const sortingAsc = (obj1, obj2, key) => {
    if (obj1[key] < obj2[key])
      return -1;
    if (obj1[key] > obj2[key])
      return 1;
    return 0;
  }

  switch(sort){
    case 'fameDesc':
      suggestions.sort((obj1, obj2) => {
        return sortingDesc(obj1, obj2, 'fame')
      })
      break;
    case 'interestNb' :
      suggestions.sort((sugg1, sugg2) => {
          return sortingDesc(sugg1, sugg2, 'CommonInterestNb')
      })
      break;
    case 'ageDesc':
      suggestions.sort((obj1, obj2) => {
        return sortingAsc(obj1, obj2, 'birthday')
      })
      break;
    case 'ageAsc':
      suggestions.sort((obj1, obj2) => {
        return sortingDesc(obj1, obj2, 'birthday')
      })
      break;
    case 'distanceAsc':
      suggestions.sort((obj1, obj2) => {
        const obj1Dis = getDistance(
          { latitude: user.data.lon, longitude: user.data.lat },
          { latitude: obj1.location_lon, longitude: obj1.location_lat}
        );
        const obj2Dis = getDistance(
          { latitude: user.data.lon, longitude: user.data.lat },
          { latitude: obj2.location_lon, longitude: obj2.location_lat}
        );
        if (obj1Dis < obj2Dis)
          return -1;
        if (obj1Dis > obj2Dis)
          return 1;
        return 0;
      })
      break;
      default:
  }
const updateSuggestions = (input) => {
  setSuggestions(input);
  // compareInterests();
}
  if(suggestions.length){
    suggestions.map((suggestion, key) => {
      suggestUser.push(
          <Card key={key} className={classes.card}>
            <CardMedia
              className={classes.media}
              image={suggestion.avatar? `${suggestion.avatar}`: '../images/default_avatar'}
            />
            <CardContent>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <Typography variant="overline" component="p" style={{display:"flex",alignItems:"center"}}>
                  {suggestion.online?
                    <FiberManualRecordIcon color="primary" fontSize="small"/>:
                    <FiberManualRecordIcon color="error" fontSize="small"/>
                  }
                  {suggestion.username} 
                </Typography>
                <Typography variant="caption" component="p"><i className="fas fa-star" style={{color:"var(--primary-color)"}}></i>{suggestion.fame}</Typography>
              </div>
              <Typography variant="subtitle2" component="span">
                {toUpperCase(suggestion.firstname)+" "+toUpperCase(suggestion.lastname)}
              </Typography>
              {suggestion.gender==="male" ? 
                <i className="fas fa-male" style={{color:"var(--primary-color)",paddingLeft:"5px"}}></i> : 
                <i className="fas fa-female" style={{color:"var(--primary-color)",paddingLeft:"5px"}}></i>}
              <Typography variant="caption" component="p"></Typography>
              <Typography variant="caption" component="p"><LocationOnIcon fontSize="small" color="primary"/>{suggestion.city}</Typography>
              <Typography variant="caption" component="p"><WcIcon fontSize="small" color="primary"/>{toUpperCase(suggestion.sex_prefer)}</Typography>
              <Typography variant="caption" component="p"><CakeIcon fontSize="small" color="primary"/>{calculateAge(suggestion.birthday)}</Typography>
            </CardContent>
            <Button size="small" color="primary" href={`/profile/${suggestion.id_user}`} style={{float:"right", marginRight:"5px"}}>Visit Profile</Button>
          </Card>
      );
      return suggestUser;
    });
  }

  return (
    <div className="container">
      <div style={{display:"flex",padding:"10px",justifyContent:"space-between"}}>
        <Filter update={updateSuggestions}/>
        <form>
          <TextField placeholder='Search Users'
            value={searchUserInput} onChange={e=>setSearchUserInput(e.target.value)}
          />
          <IconButton type='submit' size="small" color="primary" onClick={(e)=>OnClick(e)}>
            <SearchIcon fontSize="small"/>
          </IconButton>
        </form>
      </div>
      <div style={{textAlign:"right", margin:"10px"}}>
        <FormControl>
          <Select value={sort} onChange={e=>setSort(e.target.value)} 
            displayEmpty style={{fontSize:"12px"}}>
            <MenuItem value="fameDesc">Fame: High to Low</MenuItem>
            <MenuItem value="interestNb">Interest: High to Low</MenuItem>
            <MenuItem value="distanceAsc">Distance: Close to Far</MenuItem>
            <MenuItem value="ageDesc">Age: High to Low</MenuItem>
            <MenuItem value="ageAsc">Age: Low to High</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{display:"flex",flexWrap:"wrap", }}>
        {/* <Grid container spacing={3}> */}
          {suggestions.length ? suggestUser : null}
        {/* </Grid> */}
      </div>
    
    </div>
  )
}

export default Index
