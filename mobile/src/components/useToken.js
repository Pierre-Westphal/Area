import { useState } from 'react';

export default function useToken(name) {
  const getToken = () => {
    const tokenString = localStorage.getItem(name);
    const userToken = JSON.parse(tokenString);
    return userToken?.text
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem(name, JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}