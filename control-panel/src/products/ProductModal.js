import React from 'react';
import Dropzone from 'react-dropzone';
import PhotoPlaceHolder from '../shared/PhotoPlaceHolder';
import Uploading from '../shared/Uploading';
import FirebaseImage from '../shared/FirebaseImage';
import { Button, Card, Dialog, DialogActions, Textfield } from 'react-mdl';

class ProductModal extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      uploading: false,
    };

    this.productsRef = context.database.ref('products');
    this.categoriesRef = context.database.ref('categories');
    this.storage = context.storage;
    this.isEditing = false;
  }

  componentWillReceiveProps(nextProps) {
    this.isEditing = nextProps.product ? true : false;
    this.name.inputRef.value = nextProps.product ? nextProps.product.name : '';
  }

  componentDidMount() {
    this.categoriesRef.once('value', (snap) => {
      const categoriesObj = snap.val();
      this.setState({
        categories: Object.keys(categoriesObj).map(key => categoriesObj[key]),
      });
    })
  }

  onDrop = (files) => {
    this.setState({
      file: files[0]
    });
  }

  isDataValid = (cb) => {
    const productName = this.name.inputRef.value;
    if (this.isEditing && !productName) {
      cb(false, "Preencha a categoria e a foto");
      return;
    }
    if (!this.isEditing && (!productName || !this.state.file)) {
      cb(false, "Preencha a categoria e a foto");
      return;
    }
    this.updateIndexAndReturnIfDataExists(productName, cb);
  }

  updateIndexAndReturnIfDataExists = (productName, cb) => {
    productName = productName.toLowerCase();
    const previousProductName = this.isEditing ? this.props.product.name.toLowerCase() : '';
    const productNameRef = this.context.database.ref(`productNames/${productName}`);
    productNameRef.transaction((currentData) => {
      if (currentData !== null && !this.isEditing)
        return;
      if (currentData !== null && previousProductName !== productName)
        return;

      return true;
    }, (error, commited, snapshot) => {
      if (error) {
        return cb(false, error);
      } else if (!commited) {
        return cb(false, "Categoria já existe");
      } else {
        if (this.isEditing && productName !== previousProductName) {
          this.context.database.ref(`productNames/${previousProductName}`).remove();
        }
        return cb(true);
      }
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.isDataValid((isValid, error) => {
      if (!isValid) {
        this.setState({ error: error });
        return;
      }

      const productName = this.name.inputRef.value;
      if (this.isEditing) {
        this.updateProduct(productName);
        return;
      }

      this.insertProduct(productName);
    });
  }

  insertProduct = (productName) => {
    const productRef = this.productsRef.push({
      name: productName,
      active: false,
    });

    this.updateStorage(productRef);
  }

  updateProduct = (productName) => {
    const productRef = this.productsRef.child(this.props.product.id);
    productRef.update({
      name: productName,
    });

    if (this.state.file) {
      this.updateStorage(productRef);
      return;
    }

    this.finishSubmit();
  }

  updateStorage = (productRef) => {
    const file = this.state.file;
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
    this.close();
    this.props.onAdded();
  }

  resetForm = () => {
    this.setState({
      error: null,
      file: null,
    });
  }

  close = () => {
    this.resetForm();
    this.props.onClose();
  }

  render() {
    const { error, file, uploading } = this.state;
    const { product, show } = this.props;
    const img = file
      ? <img src={file.preview} alt="Categoria" style={{width: 280, height: 280}} />
      : product
        ? <FirebaseImage storageUrl={product.imageUrl} />
        : null;
    return (
      <div>
        <Dialog open={show} style={{width: 320}}>
          <form action="#" method="post" onSubmit={this.onSubmit}>
            <Card className="css-card">
              <div style={{height: 280, with: 280, position: 'relative'}}>
                { uploading ?
                  <Uploading /> :
                  (
                    <Dropzone onDrop={this.onDrop} multiple={false} style={{border: 0, cursor: 'pointer'}}>
                    {
                      img
                        ? img
                        : <PhotoPlaceHolder />
                    }
                    </Dropzone>
                  )
                }
              </div>
              <div>
                <Textfield ref={(c) => this.name = c } disabled={uploading} floatingLabel
                  error={error} onChange={() => this.setState({ error: null })}
                  label="Produto" />
                <Textfield ref={(c) => this.price = c } disabled={uploading} floatingLabel
                  label="Preço" />
                <Textfield ref={(c) => this.price = c } disabled={uploading} floatingLabel
                  label="Preço" />
              </div>
            </Card>
            <DialogActions>
              <Button raised colored disabled={uploading}>Salvar</Button>
              <Button type="button" onClick={this.close}>Cancel</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

ProductModal.propTypes = {
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
