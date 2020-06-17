import decode from "jwt-decode";

const validateToken = (token) => {
    if(token){
        return decode(token)['userid'];
    }
    
}

export default validateToken;