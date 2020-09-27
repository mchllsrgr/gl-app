import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { SignUp } from './components/user/SignUp';
import { LogIn } from './components/user/LogIn';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";


interface User {
  id: number;
  email: string;
  name: string;
}

export default function App() {
  const [user, setUser] = useState({} as Partial<User>);
  const [error, setError] = useState<boolean>(false);

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

  const login = (e: React.FormEvent<HTMLFormElement>, email: string, password: string) => {
    e.preventDefault();
    axios.post('/user/login', {email: email, password: password})
    .then((res) => {
      if (res.data.error) {
        console.log(res.data.error);
        setError(true);
      } else {
        setUser({
          id: res.data.id,
          email: res.data.email,
          name: res.data.name
        });
        localStorage.setItem('userID', res.data.id);
        setError(false);
      }
    })
    .catch(err => console.error(err));
  };

  const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.clear();
    setUser({});
  };
  
  return (
    <>
    {user.id ?
    <div className="welcome">
      <p>Hello, {user.name}!</p>
      <button onClick={(e) => logout(e)}>Log out</button>
    </div>
    :
    <Router>

      <ul className="nav">
        <li><NavLink to="/login" activeStyle={{fontWeight: 'bold'}}>Log in</NavLink></li>
        <li><NavLink to="/signup" activeStyle={{fontWeight: 'bold'}}>Sign up</NavLink></li>
      </ul>

      <Switch>
        <Route path="/login">
          <LogIn action={login} error={error} />
        </Route>
        <Route path="/signup">
          <SignUp action={signup} />
        </Route>
      </Switch>

    </Router>
    }
    </>
  )
}
