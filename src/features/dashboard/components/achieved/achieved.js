import React from 'react'
import masterStyles from '../../../../master-style';
import { Line } from 'rc-progress';
import { progressColorGenerator } from '../enrolled/enrolled';

function Achieved({ data }) {
    const { achieved } = data    
    return (

        <section style={masterStyles.dashboard_widget}>
            {
                achieved.map((e, index) => {
                    return <div className="subject" style={{
                        backgroundColor: "#a9bbac",
                        borderRadius: "4px"
                    }} key={index}>
                        <span>{e.course.name}</span>
                        <div>100% progress completed</div>                        
                    </div>
                })

            }
        </section>        
    )
}

export default Achieved;
