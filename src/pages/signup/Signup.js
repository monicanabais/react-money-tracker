import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import styles from './Signup.module.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { signup, isPending, error } = useSignup();

  const handleSubmit = e => {
    e.preventDefault();
    signup(email, password, username);
  }

  return (
    <form className={styles['signup-form']} onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>Email:</span>
        <input type="email" onChange={e => setEmail(e.target.value)} value={email} />
      </label>
      <label>
        <span>Password:</span>
        <input type="password" onChange={e => setPassword(e.target.value)} value={password} />
      </label>
      <label>
        <span>Username:</span>
        <input type="text" onChange={e => setUsername(e.target.value)} value={username} />
      </label>

      {isPending && <button className="btn" disabled>Loading</button>}
      {!isPending && <button className="btn">Sign up</button>}
      {error && <p>{error}</p>}
    </form>
  )
}

export default Signup;
