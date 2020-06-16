import React, { useEffect } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL } from '../../Config';

function LandingPage() {

    useEffect (() => {
        const endPoint = `${API_URL}`
    }, [input])
    
    return (
        <>
        <div style={{ windth: '100%' , margin: '0'}}>
            <div style={{ width: '85%', margin: '1rem auto'}}>
                <h2>Movie by lastest</h2>
                <hr />


            </div>
        
            <div style={{ display: 'flex', justifyContent: 'center'}}>
            <button>Load More</button>
            </div>

        </div>
        </>
    )
}


export default LandingPage
