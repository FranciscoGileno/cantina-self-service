import React from 'react';
import placeholder from '../place-holder.png';

const CategoryAdd = () => (
  <div className="mdl-card mdl-color mdl-shadow--2dp css-card">
    <form  action="#">
      <div className="mdl-card__media">
        <img src={placeholder} className="css-card__img" alt="" />
      </div>
      <div className="mdl-card__title">
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input className="mdl-textfield__input" type="text" id="name" />
          <label className="mdl-textfield__label" htmlFor="name">Name...</label>
        </div>
      </div>
      <div className="mdl-card__actions mdl-card--border">
        <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="">
          Adicionar
        </a>
      </div>
    </form>
  </div>
);

export default CategoryAdd;
