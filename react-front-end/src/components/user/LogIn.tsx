import React, { useState } from 'react';

type LogInTypes = { action: any; error: {status: boolean, message: string} }

export const LogIn = ({ action, error }: LogInTypes) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <>
    {error && <div className="error">{error.message}</div>}
    <form>
    <label>
      Email:
      <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </label>
    <br />
    <label>
      Password:
      <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
    </label>
    <br />
    <input type="submit" value="Submit" onClick={(e) => action(e, email, password)} />
  </form>
  </>
  )
}