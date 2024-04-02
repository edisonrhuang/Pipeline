import React, { useState } from 'react';
import axios from 'axios';

const CandidateDelete = () => {
    const [candidate_id, setCandidateId] = useState('');

    const handleDelete = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_HOST}/api/delete-candidates`, { data: candidate_id });
            alert('Candidate deleted successfully');
            setCandidateId('');
            console.log(res.data);
        } catch (error) {
            console.error('Error deleting candidate:', error.response.data);
            alert('Error deleting candidate');
        }
    };

    return (
        <div>
            <label>
                Candidate ID:
                <input type="text" value={candidate_id} onChange={(e) => setCandidateId(e.target.value)} />
            </label>
            <br />
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default CandidateDelete;
