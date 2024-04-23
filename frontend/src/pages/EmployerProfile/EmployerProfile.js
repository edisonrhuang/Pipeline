import React from 'react'
import "./employerprofile.css"
import img from "./bivashPic.jpg"
import logoImage from "./logo.png"

const profileData = {
     name: 'Bivash Oli',
     company: 'Virginia Tech',
     email: 'bivasholi@vt.edu',
   };


const EmployerProfile = () => {
     const { name, company, email} = profileData;
     return (
          <div className="profile">
               <nav className = "navbar" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.8rem 2rem',
                    height: '60px',
                    backgroundColor: '#ffffff', // White background
                    color: 'purple',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
               }}>
                    <img src={logoImage} alt="Pipeline" style={{height: '300px', marginRight: '0.2rem', marginLeft: '-3rem'}} /> 
                    <div>
                         <button className="login_button">Update</button>
                    </div>
               </nav>
               <div id ="content">
                    <div id="white" className="half">
                         <div id="p_info">
                              <h1 id="name">{name}</h1>
                              <p><b>Company:</b> {company}</p>
                              <p><b>Email:</b> {email}</p>
                         </div>
                    </div>
                    <div id="purple" className="half">
                         <img src={img} alt="image" />
                    </div>
               </div>
               
               
          </div>
     );
}

export default EmployerProfile;