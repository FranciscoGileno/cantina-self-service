import React from 'react';
import Product from './Product';
import FABAdd from '../shared/FABAdd';
import ProductModal from './ProductModal';
import Loading from '../shared/Loading';

class ProductList extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      categories: [],
      loading: true,
      products: {},
      showModal: false,
    }

    this.categoriesRef = context.database.ref('categories');
    this.productRef = context.database.ref('products');
    this.storage = context.storage;
  }

  componentDidMount() {
    this.categoriesRef.once('value', (snap) => {
      const categoriesObj = snap.val();
      this.setState({
        categories: Object.keys(categoriesObj).map(key => { return { ...categoriesObj[key], key }}),
      });
    });
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
            <Product product={item} categories={this.state.categories} key={index} onClick={this.handleProductEdit} />
          ))
        }
        <div>
          <ProductModal categories={this.state.categories} product={this.state.productToEdit} show={this.state.showModal} onAdded={this.update} onClose={this.handleCloseClick} />
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
