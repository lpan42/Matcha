import React from 'react'
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const Footer = () => {
    return (
        <footer style={{
            height:"5%",
            width:"100%",
            // position:"fixed",
            bottom: "0", 
            backgroundColor:"var(--primary-color)",
            color:"white",
        }}>
            <Divider />
            <div style={{display:"flex",justifyContent:"space-between",padding:"0 10px"}}>
                <Typography variant="caption">Matcha2020</Typography>
                <Typography variant="caption">Lpan && Cchi @ 42Paris</Typography>
            </div>
        </footer>
    )
}

export default Footer
