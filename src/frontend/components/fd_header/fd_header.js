import React from "react";
import { Link } from "react-router-dom";
import './fd_header.css'

const FDHeader=()=>{
    return(
        <div className="header">
            <Link  to ="/fd_Page"><h2 className="t1">Create fd</h2></Link>
            <Link to="/urFD"><h2 className="t1">Your FDs</h2></Link>

            
        </div>
    )
}

export default FDHeader