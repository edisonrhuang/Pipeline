import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectCandidates = () => {
    const [candidates, setCandidates] = useState([]);

    const fetchCandidates = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/get-candidates`);
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
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Info</th>
                        <th>Skills</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map(candidate => (
                        <tr key={candidate.id}>
                            <td>{candidate.first_name}</td>
                            <td>{candidate.last_name}</td>
                            <td>{candidate.email}</td>
                            <td>{candidate.phone_number}</td>
                            <td>{candidate.info}</td>
                            <td>{candidate.skills}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SelectCandidates;
