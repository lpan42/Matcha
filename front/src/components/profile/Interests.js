import React, { Fragment } from 'react'
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    chip: {
      margin: theme.spacing(0.3),
    },
  }));

const Interests = ({ interests }) => {
    const classes = useStyles();

    const interest =[];
    for(const key in interests){
        interest.push(<Chip key={key} className={classes.chip} size="small" color="primary" label={interests[key].interest} />);
    }
    return (
        <Fragment>{ interest }</Fragment>
    )
}

export default Interests
