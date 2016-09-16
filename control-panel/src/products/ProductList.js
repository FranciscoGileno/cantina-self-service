import React from 'react';
import Product from './Product';
import FABAdd from '../shared/FABAdd';
import ProductModal from './ProductModal';
import Loading from '../shared/Loading';

class ProductList extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      products: {},
      loading: true,
      showModal: false,
    }

    this.productRef = context.database.ref('products');
    this.storage = context.storage;
  }

  componentDidMount() {
    this.update();
  }

  update = () => {
    this.productRef.off();
    this.productRef.once('value').then((snapshot) => {
      this.setState({
        products: snapshot.val(),
        loading: false,
        showModal: false,
      });
    });
  }

  handleProductEdit = (product) => {
    this.setState({
      productToEdit: product,
      showModal: true,
    })
  }

  handleCloseClick = () => {
    this.setState({ showModal: false });
  }

  handleAddClick = () => {
    this.setState({
      productToEdit: null,
      showModal: true,
    });
  }

  render() {
    let products = [];
    for (let product in this.state.products) {
      if (this.state.products.hasOwnProperty(product))
        products.push({...this.state.products[product], id: product});
    }
    const component = this.state.loading ? <Loading /> : (
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {
          products.map((item, index) => (
            <Product {...item} key={index} onClick={this.handleProductEdit} />
          ))
        }
        <div>
          <ProductModal product={this.state.productToEdit} show={this.state.showModal} onAdded={this.update} onClose={this.handleCloseClick} />
          <FABAdd onClick={this.handleAddClick} />
        </div>
      </div>
    );
    return component;
  }
};

ProductList.contextTypes = {
  database: React.PropTypes.object,
  storage: React.PropTypes.object,
};

export default ProductList;
