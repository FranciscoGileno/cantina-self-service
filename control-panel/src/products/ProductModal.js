import React from 'react';
import { Dialog } from 'react-mdl';
import ProductForm from './ProductForm';

class ProductModal extends React.Component {
  constructor(props, context) {
    super(props);

    this.emptyProduct = {
      name: '',
      price: '',
      categoryId: '',
    };

    this.errorMessage = 'Dados inválidos. Produto já existente?'

    this.state = {
      product: props.product || this.emptyProduct,
      uploading: false,
    };

    this.productNamesRef = context.database.ref('productNames');
    this.productsRef = context.database.ref('products');
    this.storage = context.storage;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      product: nextProps.product ? nextProps.product : this.emptyProduct,
    });
  }

  resetForm = () => {
    this.setState({
      product: this.emptyProduct,
    });
  }

  cancel = () => {
    this.resetForm();
    this.props.onCancel();
  }

  onDrop = (files) => {
    this.updateProductState({file: files[0]});
  }

  updateProductState = (field) => {
    this.setState({
      product: {...this.state.product, ...field},
      error: null,
    })
  }

  onSubmit = () => {
    const { file, ...productWithoutFile } = this.state.product;
    if (productWithoutFile.id)
      this.updateProduct(productWithoutFile, file);
    else
      this.insertProduct(productWithoutFile, file);
  }

  insertProduct = (product, file) => {
    const productRef = this.productsRef.push({
      ...product,
      active: true,
    }, (error) => {
      if (!error) {
        this.updateProductNames(product.name);
        this.updateStorage(productRef, file);
      } else {
        this.setState({ 'error': this.errorMessage });
      }
    });
  }

  updateProduct = (product, file) => {
    const { id, ...productWithoutId } = product;
    const productRef = this.productsRef.child(id);
    productRef.update(productWithoutId, (error) => {
      if (!error) {
        this.updateProductNames(product.name, this.props.product.name);
        if (file)
          this.updateStorage(productRef, file);
        else
          this.finishSubmit();
      } else {
        this.setState({ 'error': this.errorMessage });
      }
    });
  }

  updateProductNames = (newValue, previousValue) => {
    const productNameUpdate = {};
    productNameUpdate[newValue.toLowerCase()] = true;
    this.productNamesRef.update(productNameUpdate);
    if (previousValue)
      this.productNamesRef.child(previousValue.toLowerCase()).remove();
  }

  updateStorage = (productRef, file) => {
    const uploadTask = this.storage.ref(`products/${file.name}`).put(file, {'contentType': file.type});
    this.setState({ uploading: true });
    uploadTask.on('state_changed', null, null, () => {
      const filePath = uploadTask.snapshot.metadata.fullPath;
      productRef.update({ imageUrl: this.storage.ref(filePath).toString() });
      this.finishSubmit();
    });
  }

  finishSubmit = () => {
    this.setState({ uploading: false });
    this.props.onClose();
    this.props.onAdded();
  }

  render() {
    const { error, product, uploading } = this.state;
    const { categories, show } = this.props;
    return (
      <div>
        <Dialog open={show} style={{width: 320}}>
          <ProductForm uploading={uploading} product={product} categories={categories}
            onSubmit={this.onSubmit} onCancel={this.props.onClose} onDrop={this.onDrop}
            onProductChange={this.updateProductState} error={error} />
        </Dialog>
      </div>
    );
  }
}

ProductModal.propTypes = {
  categories: React.PropTypes.array,
  product: React.PropTypes.object,
  onAdded: React.PropTypes.func,
  onClose: React.PropTypes.func,
  show: React.PropTypes.bool,
}

ProductModal.contextTypes = {
  database: React.PropTypes.object,
  storage: React.PropTypes.object,
};

export default ProductModal;
