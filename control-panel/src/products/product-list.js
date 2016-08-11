import React from 'react';
import placeholder from '../place-holder.png';

const ProductList = () => (
  <div className="mdl-grid">
    <div>
      <div className="mdl-card mdl-color mdl-shadow--2dp css-card">
        <div className="mdl-card__media mdl-card--border">
          <img src="http://assets.angeloni.com.br/files/images/3/32/37/1059488_1_D.jpg" className="css-card__img" alt="" />
        </div>
        <div className="mdl-card__title">
          <h6 className="mdl-card__title-text">Batom Garoto</h6>
        </div>
        <div className="mdl-card__supporting-text">
          <h6 className="mdl-card__title-text">R$ 0,80</h6>
        </div>

        <div className="mdl-card__actions mdl-card--border">
          <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="">
            Block
          </a>
        </div>
      </div>
    </div>
    <div>
      <div className="mdl-card mdl-color mdl-shadow--2dp css-card">
        <div className="mdl-card__media">
          <img src="http://www.snickers.com/Resources/images/share/snickers.jpg" className="css-card__img" alt="" />
        </div>
        <div className="mdl-card__title">
          <h6 className="mdl-card__title-text">Snickers</h6>
        </div>
        <div className="mdl-card__supporting-text">
          <h6 className="mdl-card__title-text">R$ 2,00</h6>
        </div>

        <div className="mdl-card__actions mdl-card--border">
          <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="">
            Block
          </a>
        </div>
      </div>
    </div>
    <div>
      <div className="mdl-card mdl-color mdl-shadow--2dp css-card">
        <div className="mdl-card__media">
          <img src={placeholder} className="css-card__img" alt="" />
        </div>
        <div className="mdl-card__title">
          <h6 className="mdl-card__title-text">Novo Produto</h6>
        </div>
        <div className="mdl-card__supporting-text">
          <h6 className="mdl-card__title-text">R$ __,__</h6>
        </div>

        <div className="mdl-card__actions mdl-card--border">
          <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="">
            Adicionar
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default ProductList;
