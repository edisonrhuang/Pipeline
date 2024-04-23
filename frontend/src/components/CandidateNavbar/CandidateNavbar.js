import React from 'react';
import logoImage from "./logo.png"
import "./candidatenavbar.css"
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
	const navigate = useNavigate()
	console.log(sessionStorage.getItem('id'))
	const handleDashboard = () => {

		navigate(`/candidatedashboard`)
	 }
	const handleCandidateProfile = () => {
		navigate(`/candidateprofile/${sessionStorage.getItem('id')}`)
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
			<button style={{ border: 'none', cursor: 'pointer', appearance: 'none', background: 'none' }}
				onClick={handleDashboard}>
				<img src={logoImage} alt="Pipeline" style={{ height: '300px', marginRight: '0.2rem', marginLeft: '-3rem' }}></img>
			</button>
			<div id="container">
				<button style={{
					appearance: 'none',
					background: 'none',
					fontFamily: "JetBrains Mono",
					float: 'left'
				}} onClick={handleCandidateProfile}>Your Profile</button>
			</div>
		</nav>
	);
}

export default Navbar;