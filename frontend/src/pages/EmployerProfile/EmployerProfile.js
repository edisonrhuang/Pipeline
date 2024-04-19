import React from 'react'
import "./employerprofile.css"
import image from '../../components/Assets/bivashPic.jpg';
import Navbar from '../../components/LoginNavbar/LoginNavbar.js'

const profileData = {
     name: 'Bivash Oli',
     schoolName: 'Virginia Tech',
     gradDate: '2025',
     major: 'Computer Science',
     biography: 'I am a passionate software developer...',
     skills: ['JavaScript', 'React.js', 'HTML', 'CSS', 'Node.js']
   };


const CandidateProfile = () => {
     const { name, schoolName, gradDate, major, biography, skills } = profileData;
     return (
          <body>
          </body>
     );
}

export default CandidateProfile;