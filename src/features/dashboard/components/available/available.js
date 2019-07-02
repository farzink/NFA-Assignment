import React from 'react'
import masterStyles from '../../../../master-style';

function Available({ data }) {
    const { available, history } = data
    return (
        <section style={masterStyles.dashboard_widget}>
            {
                available.map((e, index) => {
                    return <div style={{
                        backgroundColor: "#c2ce7f",
                        borderRadius: "4px",
                        height: "48px"
                    }} key={index} className="subject with-action">
                        <span>{e.name}</span>
                        <button style={{
                            height: "40px",
                            width: "66px",
                            borderRadius: "12px",
                            border: "thin solid whitesmoke"
                        }} onClick={() => {
                            data.visit(e.id, () => {
                                data.getProfile()
                            })
                            history.push(`/enrolment/${e.id}`)
                        }}>Detail</button>
                    </div>
                })
            }
        </section>
    )
}

export default Available;
