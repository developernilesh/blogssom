import React from "react";

const Button = ({
    children,
    type = 'button',
    bgColor = 'bg-indigo-500',
    hoverColor = 'hover:bg-indigo-600',
    textColor = 'text-white',
    className = '',
    ...props
}) => {
    
  return (
    <button 
    className={`px-3 py-2 rounded-xl transition-all ease-in-out duration-200
    ${bgColor} ${hoverColor} ${textColor} ${className} `}
    {...props}
    >
      {children}
    </button>
  );
};

export default Button;
