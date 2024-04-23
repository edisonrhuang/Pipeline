import React from 'react';
import logoImage from "../Assets/logo.png"
import "./navbar.css"

const handleDashboard = () => {}
const handleCandidateProfile = () => {}
const handleSearch = () => {}

function Navbar() {
    return (
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.8rem 2rem',
        height: '60px',
        backgroundColor: '#ffffff', // White background
        color: 'purple',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
      }}>
        <button style={{border: 'none', cursor: 'pointer', appearance: 'none', background: 'none'}}>
          <img src={logoImage} alt="Pipeline" style={{height: '300px', marginRight: '0.2rem', marginLeft: '-3rem'}}></img>
        </button> 
        <div id="container">
          <button style={{
            border: 'none',
            appearance: 'none',
            background: 'none',
            fontFamily: "JetBrains Mono",
            float: 'left'
          }} onClick={handleDashboard}>Your Profile</button>
          <button style={{
            border: 'none',
            appearance: 'none',
            background: 'none',
            fontFamily: "JetBrains Mono",
            float: 'right',
            marginLeft: '5%'
          }}>Search</button>
        </div>
      </nav>
    );
  }
  
  export default Navbar;