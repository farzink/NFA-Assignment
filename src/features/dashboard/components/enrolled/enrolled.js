import React from 'react'
import { Line } from 'rc-progress';
import masterStyles from '../../../../master-style';

function Enrolled({ data }) {
    const { enrolled, history } = data    
    return (
        <section style={masterStyles.dashboard_widget}>
            {
                enrolled.map((e, index) => {
                    return <div className="subject" key={index}>

                        <span>{e.course.name}</span>
                        <Line percent={e.progress} strokeWidth="0.5" strokeColor={progressColorGenerator(e.progress)} trailColor="white" />
                        {<button onClick={() => history.push(`/detail/${e.course.id}`)}>Show Details</button>}
                    </div>
                })

            }
        </section>
    )
}

export const progressColorGenerator = (progress) => {
    return `
        rgb(100,${progress * 2.5 + 5} ,23)
    `
}

export default Enrolled;
