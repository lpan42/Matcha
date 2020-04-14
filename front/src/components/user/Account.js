import React,{ Fragment, useState, useContext, useEffect }  from 'react';
import UserContext from '../../contexts/user/userContext';
import EditAccount from './EditAccount';
import { toast } from 'react-toastify';
import toUpperCase from '../../utils/toUpperCase';

const Account = () => {
  const userContext = useContext(UserContext);

  const { user, error, success, loadUser,clearSuccess, clearError } = userContext;
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    loadUser();
    if(error) {
        toast.error(error);
        clearError();
    }
    if(success) {
      toast.success(success);
      clearSuccess();
    }
      //eslint-disable-next-line
  }, [error, success]);

  const onClick = () => {
      setEdit(true);  
  }

  const accountInfo = (
    <Fragment>
      <div className="form-group"> 
          <p>Username:</p> <p>{user && toUpperCase(user.data.username)}</p> 
          <p>Email:</p> <p>{user && user.data.email}</p> 
          <p>Firstname:</p> <p>{user && toUpperCase(user.data.firstname)}</p> 
          <p>Lastname:</p> <p>{user && toUpperCase(user.data.lastname)}</p>
          <button className="btn btn-primary btn-block" onClick={onClick}>Edit</button>
      </div>
    </Fragment>
  )

  return (
      <div className='container'>
        { !edit ? accountInfo : <EditAccount />}
      </div>
  )
}

export default Account
