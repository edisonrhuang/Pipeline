import React from 'react'
import "./candidateprofile.css"
import image from '../../components/Assets/bivashPic.jpg';

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
          <div className="candidate-profile">
               <div className="profile-picture">
                    <img src={image} alt="Profile" />
               </div>
               <div className="profile-details">
                    <h2>{name}</h2>
                    <p>{schoolName} {gradDate}</p>
                    <p>Major: {major}</p>
                    <p>Biography: {biography}</p>
                    <div className="skills">
                         <h3>Skills:</h3>
                         <ul>
                              {skills.map((skill, index) => (
                                   <li key={index}>{skill}</li>
                              ))}
                         </ul>
                    </div>
               </div>
          </div>
     );
}

export default CandidateProfile;