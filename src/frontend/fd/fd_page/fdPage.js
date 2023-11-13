import React from "react";
import Create_fd from "../create_fd/create_fd";
import Navbar from "../../DROPDOWN/Navbar";
import FDHeader from "../../components/fd_header/fd_header";


const FDPage=()=>{
    return (
        <div>
            <Navbar/>
            <FDHeader/>
            <Create_fd/>

        </div>
    )
}

export default FDPage