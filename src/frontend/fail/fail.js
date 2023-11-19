import React from 'react';
import Navbar2 from '../components/Navbar2/Navbar2';
import './fail.css'; 

const Fail = () => {
  return (
    <div>
      <Navbar2/>
    <div className="fail-container">
      <h1>Fail!</h1>
      <p>Your operation encountered an issue.</p>
    </div>
    </div>
  );
};

export default Fail;
