import React,{ Fragment, useState, useContext, useEffect }  from 'react';
import UserContext from '../../contexts/user/userContext';
import AlertContext from '../../contexts/alert/alertContext';

const Account = () => {
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);

  const { user, error, success, editAccount, clearMessage, loadUser } = userContext;
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

  const onSubmit =(e) => {
    e.preventDefault();
	editAccount(user);
  }

const editForm = (
  <Fragment>
      <form onSubmit={onSubmit}>
          <div className="form-group">
              <label htmlFor="email">Email: </label>
			  <input type='email' name='email' 
				placeholder={user && user.data.email} 
				onChange={e => user.data.email = e.target.value.toLowerCase()} />
          </div>
          <div className="form-group">
              <label htmlFor="firstname">Firstname: </label>
			  <input type='text' name='firstname'
				placeholder={user && user.data.firstname}
				onChange={e => user.data.firstname = e.target.value.toLowerCase()} />
          </div>
          <div className="form-group">
              <label htmlFor="lastname">Lastname: </label>
			  <input type='text' name='lastname'
			  	placeholder={user && user.data.lastname} 
			  	onChange={e => user.data.lastname = e.target.value.toLowerCase()} />
          </div>
          <input type="submit" value="Comfirm" className="btn btn-primary btn-block" />
      </form>
       
  </Fragment>
)
  return (
      <div className='container'>
        { !edit ? accountInfo : editForm}
      </div>
  )
}

export default Account
