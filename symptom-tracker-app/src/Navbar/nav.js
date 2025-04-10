import React, { useState } from 'react';
import './nav.css'; // Import the CSS file
import simpleWeatherIcon from './NavAssets/Simple-weather-logo.png'
import teslaTrackerIcon from './NavAssets/tesla-tracker-logo.png'
import mattIcon from './NavAssets/matt-logo.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen); // Toggle the menu state
      console.log('Menu toggled:', isMenuOpen); // Log the menu state for debugging
  };

  return (
    <div className="navbar-container">
        <nav className="desktop-navbar">
          <a href="https://simple-weather-lac.vercel.app" className="navButton" id='simpleWeatherButton'>
              Simple Weather
          </a>
          <a href="https://tesla-tracker.vercel.app" className="navButton" id='teslaTrackerButton'>
              Tesla Tracker
          </a>
          <a href="#" className="navButton" id='symptomTrackerButton'>
              Daily Symptoms
          </a>
          <a href="https://github.com/HiItsMatt" className="navButton" id='mattButton'>
              Made By Matt
          </a>
        </nav>
        <div className={`mobile-navbar ${isMenuOpen ? 'open' : ''}`}>
          <button className="mobile-nav-button" onClick={toggleMenu}>☰</button>
          <div className="mobile-navmenu">
            <a href="https://simple-weather-lac.vercel.app" className="mobileOption">
              <img src={simpleWeatherIcon} alt="Simple Weather Icon" className="mobileOption-icon" />
              Simple Weather
            </a>
            <div className="lineSpacer"></div>
            <a href="https://tesla-tracker.vercel.app" className="mobileSelected">
              <img src={teslaTrackerIcon} alt="Tesla Tracker Icon" className="mobileOption-icon" />
              Tesla Tracker
            </a>
            <div className="lineSpacer"></div>
            <a href="https://github.com/HiItsMatt" className="mobileOption">
              <img src={mattIcon} alt="Creator's Logo" className="mobileOption-icon" />
              Made by Matt
            </a>
          </div>
        </div>
    </div>
  );
};

export default Navbar;