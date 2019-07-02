import React from 'react'
import masterStyles from '../../../../master-style';


function Certificate({ data }) {
    const { certificates } = data    
    return (

        <section style={masterStyles.dashboard_widget}>
            {
                certificates.map((e, index) => {
                    return <div className="subject" style={{
                        backgroundColor: "goldenrod",
                        borderRadius: "4px"
                    }} key={index}>
                        <span>{e.name}</span>
                        <div>Certificate Honorly Achieved</div>                        
                    </div>
                })

            }
        </section>        
    )
}

export default Certificate;
