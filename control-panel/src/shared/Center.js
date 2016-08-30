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

const Center = ({children, ...props}) => (
  <div className="mdl-color--grey-200" style={flexCenter} {...props}>
    {children}
  </div>
);

export default Center;
