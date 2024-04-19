import React from "react";

const Button = ({
    children,
    type = 'button',
    bgColor = 'bg-fuchsia-600',
    hoverColor = 'hover:bg-fuchsia-700',
    textColor = 'text-white',
    className = '',
    ...props
}) => {
    
  return (
    <button 
    className={`px-3 py-1 rounded-xl $(bgColor) 
    $(hoverColor) $(textColor) $(className)`}
    {...props}
    >
      {children}
    </button>
  );
};

export default Button;
