import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/tracker'); // Redirect to pantry tracker page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#" className="navbar-logo">Pantry TrackerPlus</a>
          <div className="navbar-links">
            <Link to="/about">About</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </nav>
      <div className="container">
        <h1 className="welcome-message">Welcome to Pantry TrackerPlus! Get Started Now!</h1>
        <div className="form-container">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Username:</label>
            <input
              type="text"
              id="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">LOGIN</button>
            <Link to="/signup" className="signup-link">Don't have an account? Sign Up</Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
