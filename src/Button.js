import React from 'react';
import './Button.css'; // Import the CSS file we'll create

const Button = ({ label, onClick }) => {
  return (
    <div ontouchstart="">
      <div className="button">
        <a href="#" onClick={onClick}>
          {label}
        </a>
      </div>
    </div>
  );
};

export default Button;
