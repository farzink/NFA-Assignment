import React from 'react'
import styles from './sidebar-style'
import { NavLink } from "react-router-dom";



function Sidebar() {
    return (
        <aside style={styles.sidebar}>
            <div style={{ margin: 8 }}>
                <NavLink style={{ textDecoration: 'none', color: '#e4c799', fontSize: 'larger' }} to="/">Crimes</NavLink>
            </div>
            <div style={{ margin: 8 }}>
                <NavLink style={{ textDecoration: 'none', color: '#e4c799', fontSize: 'larger' }} to="/teams">Teams</NavLink>
            </div>
            <div style={{ margin: 8 }}>
                <NavLink style={{ textDecoration: 'none', color: '#e4c799', fontSize: 'larger' }} to="/states">States</NavLink>
            </div>

        </aside >
    )
}




export default Sidebar
