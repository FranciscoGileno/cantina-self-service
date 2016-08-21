import React from 'react';

const divClass = {
  backgroundColor: 'white',
  borderRadius: 5,
  border: '3px solid #f0f0f0',
  height: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  fontSize: '11px',
};

const PhotoPlaceHolder = () => (
  <div style={divClass}>
    Clique ou arraste para adicionar foto
  </div>
);

export default PhotoPlaceHolder;
