//rce from es7 react extension
import React, { useContext, useEffect } from 'react'
import UserContext from '../../contexts/user/userContext';
// import Spinner from '../layout/Spinner';
import { toast } from 'react-toastify';

const Index = () => {
  const userContext = useContext(UserContext);

  const { error, success, loadUser} = userContext;
  
  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  // if (loading) return <Spinner />;

  return (
    <div>Index Page</div>
  )
}

export default Index
