import React from 'react';
import Product from './product';
import placeholder from '../place-holder.png';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    const productsRef = this.context.database.ref('products');
    productsRef.off();

    var setProduct = function(data) {
      this.setState({
        products: [...this.state.products, data.val()]
      });
    }.bind(this);

    productsRef.on('child_added', setProduct);
    productsRef.on('child_changed', setProduct);
  }

  render() {
    return (
      <div className="mdl-grid">
        {this.state.products.map((item, index) => (
          <Product {...item} key={index} />
        ))}
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
  }
};

ProductList.contextTypes = {
  database: React.PropTypes.object
};

export default ProductList;
