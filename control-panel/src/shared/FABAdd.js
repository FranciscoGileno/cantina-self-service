import React from 'react';
import { FABButton, Icon } from 'react-mdl';

const FABAdd = ({ onClick }) => (
  <FABButton className="css-fab" colored onClick={onClick}>
    <Icon name="add" />
  </FABButton>
);

export default FABAdd;
