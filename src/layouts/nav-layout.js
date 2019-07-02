import React from "react";
import styles from "./nav-layout-styles";
import Sidebar from "../features/sidebar/sidebar";
import Navbar from "../features/navbar/navbar";
import {
    withRouter
} from 'react-router-dom'



const NavLayout = ({ component: Component, history }) => {

    return (
        <div className="grid-container">
            <div className="logo">
                NFL
            </div>            
            <Navbar router={history}/>            
            <div className="sidebar">
                <Sidebar />
            </div>
            
            <main className="main" style={styles.container}>
                <Component />
            </main>
        </div>
    )
}



export default withRouter(NavLayout)

