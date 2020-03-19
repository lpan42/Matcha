import React,{ Fragment, useState, useContext, useEffect }  from 'react';
import UserContext from '../../contexts/user/userContext';
import AlertContext from '../../contexts/alert/alertContext';
import EditAccount from './EditAccount';

const Account = () => {
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);

  const { user, error, success, clearMessage, loadUser } = userContext;
  const { setAlert } = alertContext;
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    loadUser();
    if(error) {
      setAlert(error, 'danger');
      clearMessage();
    }
    if(success) {
      setAlert(success, 'success');
      clearMessage();
    }
      //eslint-disable-next-line
  }, [error, success]);

  const onClick = () => {
      setEdit(true);  
  }

  const accountInfo = (
    <Fragment>
      <div className="form-group"> 
          <p>Email:</p> <p>{user && user.data.email}</p> 
          <p>Firstname:</p> <p>{user && user.data.firstname}</p> 
          <p>Lastname:</p> <p>{user && user.data.lastname}</p>
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
