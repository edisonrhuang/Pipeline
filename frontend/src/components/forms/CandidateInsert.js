import React, { useState } from 'react';
import axios from 'axios';

const CandidateInsert = () => {
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
        account_created: getDate(),
        profile_picture: null
    });
    const jsonData = JSON.stringify(formData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5002/api/create-candidates', { data: jsonData });
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
                account_created: getDate(),
                profile_picture: null
            });
            console.log(res.data);
        } catch (error) {
            console.error('Error inserting candidate:', error.response.data);
            alert('Error inserting candidate');
        }
    };

    return (
        <form onSubmit={handleSubmit} method="POST">
            <label>
                First Name:
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
            </label>
            <br />
            <label>
                Last Name:
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <br />
            <label>
                Phone Number:
                <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
            </label>
            <br />
            <label>
                Date of Birth:
                <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} />
            </label>
            <br />
            <label>
                Additional Information:
                <textarea name="info" value={formData.info} onChange={handleChange} />
            </label>
            <br />
            <label>
                Gender:
                <select name="gender" value={formData.gender} onChange={handleChange}>
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
                <select name="ethnicity" value={formData.ethnicity} onChange={handleChange}>
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
                Graduation Date:
                <input type="date" name="graduation_date" value={formData.graduation_date} onChange={handleChange} />
            </label>
            <br />
            <label>
                Profile Picture:
                <input type="file" name="profile_picture" accept="image/*" onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
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

export default CandidateInsert;
