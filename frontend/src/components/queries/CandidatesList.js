// CandidatesList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CandidatesList = () => {
    const [candidates, setCandidates] = useState([]);

    const fetchCandidates = async () => {
        try {
            const response = await axios.get('http://localhost:5002/api/get-candidates');
            setCandidates(response.data);
        } catch (error) {
            console.error('Error fetching candidates:', error.response.data);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchCandidates();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h2>Candidates List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Info</th>
                        <th>Gender</th>
                        <th>Ethnicity</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map(candidate => (
                        <tr key={candidate.id}>
                            <td>{candidate.candidate_id}</td>
                            <td>{candidate.first_name}</td>
                            <td>{candidate.last_name}</td>
                            <td>{candidate.email}</td>
                            <td>{candidate.phone_number}</td>
                            <td>{candidate.info}</td>
                            <td>{candidate.gender}</td>
                            <td>{candidate.ethnicity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CandidatesList;
