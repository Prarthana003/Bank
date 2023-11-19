import React from "react";
import Create_fd from "../create_fd/create_fd";
import Navbar2 from "../../components/Navbar2/Navbar2";
import FDHeader from "../../components/fd_header/fd_header";


const FDPage=()=>{
    return (
        <div>
            <Navbar2/>
            <FDHeader/>
            <Create_fd/>

        </div>
    )
}

export default FDPage