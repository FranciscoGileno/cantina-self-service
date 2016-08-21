import React from 'react';
import Product from './product';

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
      </div>
    );
  }
};

ProductList.contextTypes = {
  database: React.PropTypes.object
};

export default ProductList;
