import React from 'react';
import logoImage from "./logo.png"
import "./navbar.css"
import { useNavigate } from 'react-router-dom';



function Navbar() {
	const navigate = useNavigate()

	const handleDashboard = () => {
		navigate("/employerdashboard")
	}
	const handleProfile = () => {
		navigate("/employerprofile")

	}
	const handleSearch = () => {

		navigate("/candidatesearch")
	}
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
			<button onClick={handleDashboard} style={{ border: 'none', cursor: 'pointer', appearance: 'none', background: 'none' }}>
				<img src={logoImage} alt="Pipeline" style={{ height: '300px', marginRight: '0.2rem', marginLeft: '-3rem' }}></img>
			</button>
			<div id="container">
				<button style={{
					border: 'none',
					appearance: 'none',
					background: 'none',
					fontFamily: "JetBrains Mono",
					float: 'left'
				}} onClick={handleProfile}>Your Profile</button>
				<button style={{
					border: 'none',
					appearance: 'none',
					background: 'none',
					fontFamily: "JetBrains Mono",
					float: 'right',
					marginLeft: '5%'
				}} onClick={handleSearch}>Search</button>
			</div>
		</nav>
	);
}

export default Navbar;