//rce from es7 react extension
import React, { useContext, useEffect } from 'react'
import UserContext from '../../contexts/user/userContext';
// import Spinner from '../layout/Spinner';

const Index = () => {
  const userContext = useContext(UserContext);
  useEffect(() => {
    userContext.loadUser();
    //eslint-disable-next-line
  }, []);

  // if (loading) return <Spinner />;

  return (
    <div>Index Page</div>
  )
}

export default Index
