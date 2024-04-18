import React from 'react'
import './candidatecard.css'
import profile_icon from '../Assets/bivashPic.jpg'

const skillsData = [
    { name: 'Meowing', level: 'Intermediate' },
    { name: 'Barking', level: 'Intermediate' },
    { name: 'Purring', level: 'Advanced' },
    { name: 'Growling', level: 'Advanced' },
    // Add more skills as needed
];
const CandidateCard = () => {
    return (
        <div className='pc'>
            <div className="gradiant"></div>
            <div className="profile-down">
                <img src={profile_icon} alt="" />
                <div className="profile-title">Bivash Oli</div>
                <div className="major">Computer Science</div>
                <div className="school">Virginia Tech</div>
                <div className="year">2025</div>
                <div className="skills-container">
                    {skillsData.map((skill, index) => (
                        <div className="skill" key={index}>
                            {skill.name}
                            <span className={`level ${skill.level.toLowerCase()}`}>{skill.level}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CandidateCard