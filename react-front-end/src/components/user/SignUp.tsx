import React, { useState } from 'react';

type SignUpTypes = { action: any }

export const SignUp = ({ action }: SignUpTypes) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <form>
      <label>
        Full name:
        <input name="name" type="text" onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
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
      <input type="submit" value="Submit" onClick={(e) => action(e, name, email, password)} />
    </form>
  )
}