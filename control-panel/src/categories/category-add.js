import React from 'react';
import placeholder from '../place-holder.png';

const CategoryAdd = () => (
  <div className="mdl-card mdl-color css-card">
    <form action="#">
      <div className="mdl-card__media">
        <input type="image" src={placeholder} className="css-card__img" />
        <input type="file" id="my_file" style={{display: 'none'}} />
      </div>
      <div className="mdl-card__title">
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input className="mdl-textfield__input" type="text" id="name" />
          <label className="mdl-textfield__label" htmlFor="name">Nome</label>
        </div>
      </div>
    </form>
  </div>
);

export default CategoryAdd;
