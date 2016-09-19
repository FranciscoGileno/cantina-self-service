import React from 'react';

const flexCenter = {
  alignItems: 'center',
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
};

const Center = ({children, ...props}) => {
  const centerStyle = props.style ? {...props.style, ...flexCenter } : flexCenter;
  return (
    <div {...props} style={centerStyle}>
      {children}
    </div>
  );
}
export default Center;
