import React, {Fragment, useContext} from 'react';

import UserContext from '../../contexts/user/userContext';
const EditAccount = () => {
    const userContext = useContext(UserContext);
    const { user, editAccount } = userContext;

    const onSubmit =(e) => {
    e.preventDefault();
        editAccount(user);
    }

    return (
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
}

export default EditAccount
