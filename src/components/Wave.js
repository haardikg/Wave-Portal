import React from 'react'
import "./wave.css"

function Wave({from, message, timestamp}) {
    return (
        <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }} className="row">
                <h3>From: </h3>
                <p style={{ marginLeft: '10px',}}>{from}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }} className="row">
                <h3>Message: </h3>
                <p style={{ marginLeft: '10px',}}>{message}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }} className="row">
                <h3>Timestamp: </h3>
                <p style={{ marginLeft: '10px',}}>{timestamp}</p>
            </div>
        </div>
    )
}

export default Wave
