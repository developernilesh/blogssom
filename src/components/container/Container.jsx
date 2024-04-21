import React from "react";

const Container = ({children, className = '', ...props}) => {
  return <div className={`w-11/12 max-w-7xl mx-auto px-4 ${className}`} {...props}>{children}</div>;
};

export default Container;
