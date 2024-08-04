import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/tracker');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#" className="navbar-logo">Pantry TrackerPlus</a>
          <div className="navbar-links">
            <a href="/about">About</a>
            <Link to="/login">Sign In</Link>
          </div>
        </div>
      </nav>
      <div className="container">
      <h1 className="welcome-message">Sign Up To Use Pantry TrackerPlus Now!</h1>

        <div className="form-container">
          <h1>Sign Up</h1>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
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
            <button type="submit">SIGN UP</button>
          </form>
          <p className="auth-footer">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
