import React from 'react'
import './candidatecard.css'
import profile_icon from './Assets/bivashPic.jpg'

const skillsData = [
    { name: 'Meowing'},
    { name: 'Barking'},
    { name: 'Purring'},
    { name: 'Growling'},
    // Add more skills as needed
];




const CandidateCard = (props) => {
    return (
        <div className='pc'>
            <div className="gradiant"></div>
            <div className="profile-down">
                <img src={profile_icon} alt="" />
                <div className="profile-title">{props.first_name} {props.last_name}</div>
                <div className="major">{props.field_of_study}</div>
                <div className="school">{props.school_name}</div>
                <div className="year">{props.graduation_data}</div>
                <div className="skills-container">
                    {skillsData.map((skill, index) => (
                        <div className="skill" key={index}>
                            {skill.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CandidateCard