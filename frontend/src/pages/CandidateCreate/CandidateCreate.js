import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/LoginNavbar/LoginNavbar.js';
import './Button.css'
import './candidatecreate.css'



const CandidateCreate = () => {
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);



    const handleKeyDown = (e) => {
        const code = e.keyCode || e.which;
        //const newTag = tag.trim();
        if (
            (code !== 13 && code !== 188) || tag.length === 0
        ) {
            return;
        }
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        }
        setTimeout(() => {
            setTag("");
        }, 0);

        console.log(tags)
    }
    const deleteTag = (index) => {
        const dupTags = [...tags];
        dupTags.splice(index, 1);
        setTags(dupTags);
    }


    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        date_of_birth: '',
        info: '',
        gender: '',
        ethnicity: '',
        school_name: '',
        graduation_date: '',
        field_of_study: '',
        website: '',
        resume_file: null,
        account_created: getDate(),
        profile_picture: null,
    });

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        const JWT = sessionStorage.getItem("JWT")
        fetch('http://127.0.0.1:5002/candidate', {
            method: 'POST',
            headers: { 'Authorization': `${JWT}`, 'Content-Type': "application/json" },
            body: JSON.stringify(formData)
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            sessionStorage.setItem("id", data.authorizationId)
            sessionStorage.setItem("userType", data.userType)
            const skillData = {id : data.authorizationId, skills : tags}
            fetch('http://127.0.0.1:5002/skills', {
                method: 'POST',
                headers: { 'Authorization': `${JWT}`, 'Content-Type': "application/json" },
                body: JSON.stringify(skillData)
            }).then((res) => res.json()).then((data2) => {
                console.log(data2) 
                navigate("/candidatedashboard")
            }).catch(error => console.log("log:" + error))
        }).catch(error => console.log("log:" + error))

    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ textAlign: 'center', fontFamily: 'Georgia' }}>
            <Navbar />
            <h1 style={{ marginTop: '50px' }}>
                Create your account
            </h1>
            <p>
                Create an account to get connected with recruiters!
            </p>
            <br />
            <label>
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange}
                    style={{ marginLeft: '12px' }} placeholder="First Name" />
            </label>
            <br />
            <label>
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange}
                    style={{ marginTop: '10px', marginLeft: '12px' }} placeholder="Last Name" />
            </label>
            <br />
            <label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                    style={{ marginTop: '10px', marginLeft: '12px' }} placeholder="Email" />
            </label>
            <br />
            <label>
                <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange}
                    style={{ marginTop: '10px', marginLeft: '12px' }} placeholder="Phone Number" />
            </label>
            <br />
            <label>
                Date of Birth:
                <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange}
                    style={{ marginTop: '10px', marginLeft: '12px' }} placeholder="Date of Birth" />
            </label>
            <br />
            <label>
                <textarea name="info" value={formData.info} onChange={handleChange}
                    style={{ marginTop: '10px', marginLeft: '12px', width: "250px", height: "100px" }} placeholder="Tell us about yourself!" />
            </label>
            <br />
            <label>
                Gender:
                <select name="gender" value={formData.gender} onChange={handleChange}
                    style={{ marginTop: '10px', marginLeft: '12px' }}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="Others">Others</option>
                </select>
            </label>
            <br />
            <label>
                Ethnicity:
                <select name="ethnicity" value={formData.ethnicity} onChange={handleChange}
                    style={{ marginTop: '10px', marginLeft: '12px' }}>
                    <option value="">Select</option>
                    <option value="American Indian or Alaskan Native">American Indian or Alaskan Native</option>
                    <option value="Asian/Pacific Islander">Asian/Pacific Islander</option>
                    <option value="Black or African American">Black or African American</option>
                    <option value="Hispanic">Hispanic</option>
                    <option value="White/Caucasian">White/Caucasian</option>
                    <option value="Two or more">Two or more</option>
                    <option value="Other">Other</option>
                </select>
            </label>
            <br />
            <label>
                College:
                <input type="text" name="school_name" value={formData.school_name} onChange={handleChange}
                    style={{ marginTop: '10px', marginLeft: '12px' }} />
            </label>
            <br />
            <label>
                Graduation Date:
                <input type="date" name="graduation_date" value={formData.graduation_date} onChange={handleChange}
                    style={{ marginTop: '10px', marginLeft: '12px' }} />
            </label>
            <br />

            <label>
                <input type="text" name="field_of_study" value={formData.field_of_study} onChange={handleChange}
                    style={{ marginTop: '10px', marginLeft: '12px' }} placeholder="Field of Study" />
            </label>
            <br />
            <label>
                <input type="text" name="website" value={formData.website} onChange={handleChange}
                    style={{ marginTop: '10px', marginLeft: '12px' }} placeholder="Website" />
            </label>
            <br />
            <label>
                Profile Picture:
                <input type="file" name="profile_picture" value={formData.profile_picture} accept="image/*" onChange={handleChange}
                    style={{ marginTop: '10px', marginLeft: '12px' }} />
            </label>
            {/* <TagInputComponent /> */}
            <div className="tag-input-box">
                <p>Separate skills with commas</p>
                <div className="tags-container" >
                    {
                        tags.map((tag, index) => (
                            <div className="tag">
                                <span className="name">{tag}</span>
                                <span
                                    className="icon"
                                    onClick={() => deleteTag(index)}
                                >&times;</span>
                            </div>
                        ))
                    }
                    <input
                        type="text"
                        id="tag-input"
                        placeholder="Type skill here"
                        value={tag}
                        maxLength={50}
                        onChange={(e) => setTag(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div >
            </div >
            <br />
            <button className="button" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

function getDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default CandidateCreate;
