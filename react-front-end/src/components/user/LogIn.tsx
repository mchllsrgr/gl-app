import React, { useState } from 'react';

type LogInTypes = { action: any }

export const LogIn = ({ action }: LogInTypes) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <form>
    <label>
      Email:
      <input name="email" type="email" onChange={(e) => setEmail(e.target.value)} />
    </label>
    <br />
    <label>
      Password:
      <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
    </label>
    <br />
    <input type="submit" value="Submit" onClick={(e) => action(e, email, password)} />
  </form>
  )
}