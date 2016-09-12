import React from 'react';
import Dropzone from 'react-dropzone';
import PhotoPlaceHolder from '../shared/PhotoPlaceHolder';
import Uploading from '../shared/Uploading';
import FirebaseImage from '../shared/FirebaseImage';
import { Button, Card, CardTitle, Dialog, DialogActions, Textfield } from 'react-mdl';

class ProductModal extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      uploading: false,
      name: props.product ? props.product.name : ' ',
      price: props.product ? props.product.price : 0,
    };

    this.productsRef = context.database.ref('products');
    this.storage = context.storage;
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      name: nextProps.product ? nextProps.product.name : ' ',
      price: nextProps.product ? nextProps.product.price : 0,
    }
  }

  onDrop = (files) => {
    this.setState({
      file: files[0]
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.props.product) {
      this.updateProduct();
      return;
    }

    this.insertProduct();
  }

  insertProduct = () => {
    const { name, price, file } = this.state;

    if (!(name && price && file))
      // TODO: Não preenchido
      return;

    const productRef = this.productsRef.push({
      name,
      price,
    });

    this.updateStorage(productRef);
  }

  updateProduct = () => {
    const { name, price, file } = this.state;
    if (!(name && price && file))
      // TODO: Não preenchido
      return;

    const productRef = this.productsRef.child(this.props.product.id);
    productRef.update({
      name,
      price,
    });

    if (file) {
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
      file: null,
      name: '',
    });
  }

  close = () => {
    this.resetForm();
    this.props.onClose();
  }

  render() {
    const { name, price, file, uploading } = this.state;
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
              <CardTitle>
                <Textfield disabled={uploading} floatingLabel label="Produto" id="name" required
                  pattern="?[a-z]*" error="Campo obrigatório"
                  value={name} onChange={(event) => this.setState({name: event.target.value})} />
              </CardTitle>
              <CardTitle>
                <Textfield disabled={uploading} floatingLabel label="Preço" id="price" required
                  pattern="-?[0-9]*(\,[0-9]+)?" error="Valor numérico obrigatório"
                  value={price} onChange={(event) => this.setState({price: event.target.value})} />
              </CardTitle>
            </Card>
            <DialogActions>
              <Button raised colored disabled={uploading}>Salvar</Button>
              <Button onClick={this.close}>Cancel</Button>
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
