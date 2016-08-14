import React from 'react';

const Category = ({name, photoUrl}) => (
  <div className="mdl-card mdl-color mdl-shadow--2dp css-card">
    <div className="mdl-card__media mdl-card--border">
      <img src={photoUrl} className="css-card__img" alt={name} />
    </div>
    <div className="mdl-card__title">
      <h6 className="mdl-card__title-text">{name}</h6>
    </div>
    <div className="mdl-card__actions mdl-card--border">
      <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="">
        Block
      </a>
    </div>
  </div>
);

export default Category;
