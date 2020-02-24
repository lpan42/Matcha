//rce from es7 react extension
import React, { useContext, useEffect } from 'react'
import UserContext from '../../contexts/user/userContext';

const Index = () => {
  const userContext = useContext(UserContext);
  useEffect(() => {
    userContext.loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <div>Index Page</div>
  )
}

export default Index
