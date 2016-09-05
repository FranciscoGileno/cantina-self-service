import React from 'react';
import { FABButton, Icon } from 'react-mdl';


const CategoryAdd = ({ onClick }) => (
  <FABButton className="css-fab" colored onClick={onClick}>
    <Icon name="add" />
  </FABButton>
);

export default CategoryAdd;
