import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; // Import your firebase auth
import './About.css';

const About = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#" className="navbar-logo" onClick={() => navigate('/')}>Pantry TrackerPlus</a>
          <div className="navbar-links">
            <Link to="/about">About</Link>
            {user ? (
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            ) : (
              <button className="logout-button" onClick={() => navigate('/login')}>Login</button>
            )}
          </div>
        </div>
      </nav>
      <div className="about-container">
        <div className="about-card">
          <h1>About Pantry TrackerPlus</h1>
          <p>
          Pantry TrackerPlus is a comprehensive app designed to streamline your pantry management. 
          Effortlessly track your pantry items, their quantities, and expiration dates. 
          Our app also features AI-powered recipe suggestions tailored to the ingredients you have on hand, 
          ensuring you always have meal ideas at your fingertips!
          </p>
          <h2>Features:</h2>
          <ul>
            <li><strong>Add and update pantry items:</strong> Easily add new items to your pantry and update their details as needed.</li>
            <li><strong>Track quantities and expiration dates:</strong> Monitor the quantities of items in your pantry and keep an eye on expiration dates to avoid waste.</li>
            <li><strong>Get AI-based recipe suggestions:</strong> Leverage AI technology to get recipe suggestions based on the items available in your pantry.</li>
          </ul>
          <h2>How It Works:</h2>
          <ol>
            <li><strong>Add Items:</strong> Enter the details of the items in your pantry, including the name, quantity, and expiration date.</li>
            <li><strong>Update and Delete:</strong> Keep your pantry up to date by editing or removing items as needed.</li>
            <li><strong>Recipe Suggestions:</strong> Click on the "Get Recipe Suggestions" button to receive AI-generated recipe ideas based on your current pantry items.</li>
          </ol>
          <button className="get-started-button" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default About;
