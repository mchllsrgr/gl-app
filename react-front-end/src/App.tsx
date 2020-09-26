import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { SignUp } from './components/user/SignUp';

interface User {
  id: number | null;
  email: string | null;
  name: string | null;
}

export default function App() {
  const [user, setUser] = useState({} as User);

  const signup = (e: React.FormEvent<HTMLFormElement>, name:string, email: string, password: string) => {
    e.preventDefault();
    axios.post('/user/signup', {name: name, email: email, password: password})
    .then((res) => {
      setUser({
        id: res.data.id,
        email: res.data.email,
        name: res.data.name
      });
      localStorage.setItem('userID', res.data.id);
    })
    .catch(err => console.error(err));
  };

  const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('ay');
    localStorage.clear();
    setUser({id: null, email: null, name: null});
  };
  
  return (
    <>
    {user.id ?
    <>
    <div>Hello, {user.name}!</div>
    <button onClick={(e) => logout(e)}>Log out</button>
    </>
    :
    <SignUp action={signup} />}
    </>
  )
}
