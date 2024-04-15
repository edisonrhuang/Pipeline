import React, { useState } from 'react';
import axios from 'axios';

const UpdateCandidate = () => {
    const [formData, setFormData] = useState({
        candidate_id: '',
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
        profile_picture: null
    });
    const jsonData = JSON.stringify(formData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_HOST}/api/update-candidates`, { data: jsonData });
            alert('Candidate updated successfully');
            setFormData({
                candidate_id: '',
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
                profile_picture: null
            });
            console.log(res.data);
        } catch (error) {
            console.error('Error updating candidate:', error.response.data);
            alert('Error updating candidate');
        }
    };

    return (
        <form onSubmit={handleSubmit} method="POST">
            <label>
                ID:
                <input type="text" name="candidate_id" value={formData.candidate_id} onChange={handleChange} />
            </label>
            <br />
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
                Field of Study:
                <input type="text" name="field_of_study" value={formData.field_of_study} onChange={handleChange} />
            </label>
            <br />
            <label>
                Website:
                <input type="text" name="website" value={formData.website} onChange={handleChange} />
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

export default UpdateCandidate;
