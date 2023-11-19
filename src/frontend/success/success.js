import React from 'react';
import Navbar2 from '../components/Navbar2/Navbar2';
import './success.css'; // Create a Success.css file with the styles

const Success = () => {
  return (
    <div>
      <Navbar2/>
    <div className="success-container">
      
      <h1>Success!</h1>
      <p>Your operation was successful.</p>
    </div>
    </div>
  );
};

export default Success;
