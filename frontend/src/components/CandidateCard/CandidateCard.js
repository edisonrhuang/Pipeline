import React from 'react'
import './candidatecss.css'
import profile_icon from 'bivashPic.jpg'

const CandidateCard = () => {
    return(
        <div className='pc'>
            <div className="gradiant"></div>
            <div className="profile-down">
                <img src={profile_icon} alt="" />
                <div className="profile-title">Bivash Oli</div>
                <div className="profile-description">
                rawr rawr meow grrr meooowww im a cat heheh meow rawr!! XDXD
                </div>
                <div className="profile-button"><a href="https://cat-bounce.com/">Contact Me</a></div>
            </div>
        </div>
    )
}
export default CandidateCard