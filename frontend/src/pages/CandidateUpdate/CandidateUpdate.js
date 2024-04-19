import React, { useState, useEffect } from 'react';
import Navbar from '../../components/LoginNavbar/LoginNavbar.js';
import Button from '../../components/Submit_Button/Button.js'
import axios from 'axios';

const CandidateUpdate = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        date_of_birth: '',
        info: '',
        gender: '',
        ethnicity: '',
        graduation_date: '',
        field_of_study: '',
        website: '',
        account_created: getDate(),
        profile_picture: null
    });

    const [skillsList, setSkillsList] = useState([]);
    const [maxWidth, setMaxWidth] = useState(0);
    const [selectedSkills, setSelectedSkills] = useState({});

    const jsonData = JSON.stringify(formData);
    const jsonSkills = JSON.stringify(selectedSkills);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/get-skills`);
                setSkillsList(response.data);

                const maxSkillWidth = response.data.reduce((max, skill) => {
                    return Math.max(max, skill.skill.length);
                }, 0);
                setMaxWidth(maxSkillWidth * 8);
            } catch (error) {
                console.error('Error fetching skills:', error.response.data);
            }
        };

        fetchSkills();
    }, []); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSkillChange = (e) => {
        const { name, checked } = e.target;
        setSelectedSkills(prevState => {
            const updatedSkills = { ...prevState };
            if (checked) {
                updatedSkills[name] = true;
            } else {
                delete updatedSkills[name];
            }
            return updatedSkills;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_HOST}/api/create-candidates`, { data: jsonData, skills: jsonSkills });
            alert('Candidate inserted successfully');
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                date_of_birth: '',
                info: '',
                gender: '',
                ethnicity: '',
                graduation_date: '',
                field_of_study: '',
                website: '',
                account_created: getDate(),
                profile_picture: null,
            });
            setSelectedSkills({});
            console.log(res.data);
        } catch (error) {
            console.error('Error inserting candidate:', error.response.data);
            alert('Error inserting candidate');
        }
    }; 

    return (
        //<form onSubmit={handleSubmit} method="POST">

        <form onSubmit={handleSubmit} method="POST" style={{textAlign: 'center', fontFamily: 'Georgia'}}>
            <Navbar/>
            <h1 style={{marginTop: '50px'}}>
                Update Your Candidate Profile
            </h1>
            <p>
               Update the details of your account.
            </p>
            <br />
            <label>  
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} 
                style={{marginLeft: '12px'}} placeholder="First Name"/>
            </label>
            <br />
            <label>
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange}
                style={{marginTop: '10px', marginLeft: '12px'}} placeholder="Last Name"/>
            </label>
            <br />
            <label>
                <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} 
                style={{marginTop: '10px', marginLeft: '12px'}} placeholder="Phone Number"/>
            </label>
            <br />
            <label>
                <textarea name="info" value={formData.info} onChange={handleChange} 
                style={{marginTop: '10px', marginLeft: '12px', width: "250px", height: "100px"}} placeholder="Tell us about yourself!"/>
            </label>
            <br />
            <label>
                Gender:
                <select name="gender" value={formData.gender} onChange={handleChange} 
                style={{marginTop: '10px', marginLeft: '12px'}}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="Others">Others</option>
                </select>
            </label>
            <br />
            <label>
                <input type="text" name="field_of_study" value={formData.field_of_study} onChange={handleChange} 
                style={{marginTop: '10px', marginLeft: '12px'}} placeholder="Field of Study"/>
            </label>
            <br />
            <label>
                <input type="text" name="website" value={formData.website} onChange={handleChange} 
                style={{marginTop: '10px', marginLeft: '12px'}} placeholder="Website"/>
            </label>
            <br />
            <label>
                Profile Picture:
                <input type="file" name="profile_picture" accept="image/*" onChange={handleChange}
                style={{marginTop: '10px', marginLeft: '12px'}} />
            </label>
            <br />
            <br />
            <label>Select Skills:</label>
            <div style={{ border: '1px solid #ccc', padding: '10px', maxHeight: '200px', maxWidth: maxWidth + 'px', overflowY: 'auto', whiteSpace: 'pre-wrap', marginTop: '10px'}}>
                {skillsList.map(skill => (
                    <div key={skill.skill} style={{ marginBottom: '5px' }}>
                        <label>
                            <input
                                type="checkbox"
                                name={skill.skill}
                                checked={selectedSkills[skill.skill] || false}
                                onChange={handleSkillChange}
                            />
                            {skill.skill}
                        </label>
                    </div>
                ))}
            </div>
            <br />
            <Button/>
            <br />
            <br />
            <br />
            <button className="delete">Delete</button>
        </form>
    );
};

function getDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default CandidateUpdate;
