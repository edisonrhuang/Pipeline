import React, {Component} from 'react';

const connectionData = {
    firstName: 'Bivash',
    lastName: 'Oli',
    company: 'C-3 Comm Systems'
}
function notification() {
    const {firstName, lastName, company} = connectionData;
    return (
        <div style={{
            fontFamily:'Georgia',
            marginTop: '30px',
            textAlign: 'center'}}>
            {firstName} {lastName} from {company} wants to connect with you!
            <button style={{
                marginLeft: '1%'
            }}>View Account</button>
        </div>
    );
}

export default notification;