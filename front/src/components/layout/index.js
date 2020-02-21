//rce from es7 react extension
import React, { useContext, useEffect } from 'react'
import AuthContext from '../../contexts/auth/authContext';

const Index = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <div>Index Page</div>
  )
}

export default Index
