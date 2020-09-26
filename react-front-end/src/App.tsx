import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { SignUp } from './components/user/SignUp';

interface User {
  id: number;
  email: string;
  name: string;
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
    })
    .then(() => console.log(user))
    .then(() => console.log(`USER IS ${user.name}`))
  };
  
  return (
    <>
    <SignUp action={signup} />
    </>
  )
}
