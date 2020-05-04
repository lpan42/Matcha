import React, { Fragment, useContext, useEffect, useState} from 'react';
import ProfileContext from '../../contexts/profile/profileContext';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Popover from '@material-ui/core/Popover';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
    paper: {
        minHeight: 430,
        minWidth: 250,
        maxWidth: 300,
        border: '1px solid #60A561',
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
    },
    buttonGroup: {
        marginBottom: 5,
    },
    slider: {
        height:1,
        padding:0,
        maxWidth: 250,
    }
}));

const Filter = ({update}) => {
    const  profileContext = useContext(ProfileContext);
    const { getInterestsList, interests_list } = profileContext;

    useEffect(() => {
        getInterestsList();
         // eslint-disable-next-line
    },[]);

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [age, setAge] = useState([18, 100]);
    const [distance, setDistance] = useState(10);
    const [gender, setGender] = useState(null);
    const [sexPrefer, setSexPrefer] = useState(null);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const open = Boolean(anchorEl);

    const filterUser = async () => {
        setAuthToken(localStorage.token);
        const config = {
            headers: {'Content-Type': 'application/json'}
        }
        const data = {
            age:age,
            distance:distance,
            gender:gender,
            sexPrefer:sexPrefer,
            selectedInterests:selectedInterests
        }
        try{
            const result =  await axios.post('/index/filteruser', data,config);
            if(result.data){
                update(result.data.data);
            }else{
                update(result.data);
            }
            handleClose();
        }catch(err){
            console.log(err);
        }
    }

    const expendFilter = e => {
        setAnchorEl(anchorEl ? null : e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
      };
    

    const handleGender = newGender => {
        setGender(newGender);
    };
    const handleSexPrefer = newSf => {
        setSexPrefer(newSf);
    };
    const comfirmFilter = () => {
        filterUser();
    }

    let interests = [];
    let check = false;

    const removeInterests = (e) => {
        setSelectedInterests(
            selectedInterests.filter(item => item.interest !== e.currentTarget.value)
        );
    }
    const addInterests = (e) => {
        if(!selectedInterests){
            setSelectedInterests({interest: e.currentTarget.value});
        }else{
            setSelectedInterests(
                selectedInterests.concat({interest: e.currentTarget.value})
            );
        }
    }

    if(interests_list && interests_list.data){
        interests_list.data.map((interest,key) => {
        if(selectedInterests){
            selectedInterests.map((selectedInterest) => {
                if (interest.interest === selectedInterest.interest){
                    interests.push(
                        <Button color="primary" onClick={removeInterests} 
                            key={key} value={interest.interest}>
                            <Typography variant="caption">{interest.interest}</Typography>
                        </Button>
                    );
                    check = true;
                }
            })
        }
        if(check)
            check = false;
        else
            interests.push(
                <Button onClick={addInterests} key={key} value={interest.interest}>
                    <Typography variant="caption">{interest.interest}</Typography>
                </Button>
            );
        })
    }

    return (
        <Fragment>
            <Button onClick={expendFilter}>Filter<ExpandMoreIcon /></Button>
            <Popover 
                open={open} anchorEl={anchorEl} onClose={handleClose}
                anchorOrigin={{vertical: 'bottom',horizontal: 'left'}}
                transformOrigin={{vertical: 'top',horizontal: 'left'}}
            >
            <div className={classes.paper}>
                <div>
                    <Typography variant="body2">Age: {age[0]}-{age[1]}</Typography>
                    <Slider className={classes.slider} min={18} max={100} value={age} onChange={(e,newAge)=>{setAge(newAge);}}/>
                    <Typography variant="body2">Max Distance: {distance}km</Typography>
                    <Slider className={classes.slider} value={distance} step={10} min={5} max={500} onChange={(e,newDis)=>{setDistance(newDis);}}/>
                    <Typography variant="body2" component="p">Gender: {gender}</Typography>
                    <ButtonGroup size="small" className={classes.buttonGroup}>
                        <Button onClick={()=>handleGender("male")}
                            variant="contained" color={gender==="male"?"primary":null}>
                            <Typography variant="caption">Male</Typography>
                        </Button>
                        <Button onClick={()=>handleGender("female")}
                            variant="contained" color={gender==="female"?"primary":null}>
                            <Typography variant="caption">Female</Typography>
                        </Button>
                    </ButtonGroup>
                    <Typography variant="body2" component="p">Sex Preference: {sexPrefer}</Typography>
                    <ButtonGroup size="small" className={classes.buttonGroup}>
                        <Button onClick={()=>handleSexPrefer("straight")}
                            variant="contained" color={sexPrefer==="straight"?"primary":null}>
                            <Typography variant="caption">Straight</Typography>
                        </Button>
                        <Button onClick={()=>handleSexPrefer("gay")}
                            variant="contained" color={sexPrefer==="gay"?"primary":null}>
                            <Typography variant="caption">Gay</Typography>
                        </Button>
                        <Button onClick={()=>handleSexPrefer("bi")}
                            variant="contained" color={sexPrefer==="bi"?"primary":null}>
                            <Typography variant="caption">Bi</Typography>
                        </Button>
                    </ButtonGroup>
                    <Typography variant="body2" component="p">Interest Tags:</Typography>
                    {interests}
                </div>
                <Button color="primary" style={{float:"right"}} onClick={comfirmFilter}>Comfirm</Button>
            </div>
        </Popover>
    </Fragment>
    )
}

export default Filter;