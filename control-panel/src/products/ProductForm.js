import React from 'react';
import Dropzone from 'react-dropzone';
import PhotoPlaceHolder from '../shared/PhotoPlaceHolder';
import Uploading from '../shared/Uploading';
import FirebaseImage from '../shared/FirebaseImage';
import { Button, Card, DialogActions, Textfield, Menu, MenuItem } from 'react-mdl';

const ProductForm = ({categories, error, product, uploading, onProductChange, onDrop, onCancel, onSubmit}) => {
  const submit = (event) => {
    event.preventDefault();
    onSubmit();
  }

  const productImage = uploading
    ? <Uploading />
    : (
      <Dropzone onDrop={onDrop} multiple={false} style={{border: 0, cursor: 'pointer'}}>
        { product.file
          ? <img src={product.file.preview} alt="Produto" style={{width: 280, height: 280}} />
          : product.imageUrl
            ? <FirebaseImage storageUrl={product.imageUrl} />
            : <PhotoPlaceHolder />
        }
      </Dropzone>
    );

  const categoryName = product.categoryId ? categories.find((category) => category.key === product.categoryId).name : '';
  return (
    <form action="#" method="post" onSubmit={submit}>
      <Card className="css-card">
        <div style={{height: 280, with: 280, position: 'relative'}}>
          { productImage }
        </div>
        <div>
          <Textfield disabled={uploading} floatingLabel error={error}
            onChange={(event) => onProductChange({ name: event.target.value })}
            label="Produto" value={product.name} maxLength="30"
          />
          <Textfield disabled={uploading} floatingLabel
            onChange={(event) => onProductChange({ price: parseFloat(event.target.value) }) }
            label="Preço" value={product.price} type="number" pattern="[0-9]+([\.,][0-9]+)?" step="0.01"
          />
          <div className={{position: 'relative'}}>
            <Textfield disabled={uploading} floatingLabel readOnly
              id="category"
              label="Categoria" value={categoryName}  />
            <Menu target="category" valign="top" align="left">
              {categories.map((category, index) => (
                <MenuItem key={index} onClick={(event) => {
                  onProductChange({ categoryId: category.key });
                }}>
                  {category.name}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
      </Card>
      <DialogActions>
        <Button raised colored disabled={uploading}>Salvar</Button>
        <Button type="button" onClick={onCancel}>Cancel</Button>
      </DialogActions>
    </form>
  );
}

ProductForm.propTypes = {
  product: React.PropTypes.object,
  categories: React.PropTypes.array.isRequired,
  uploading: React.PropTypes.bool,
  onDrop: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
}

ProductForm.defaultProps = {
  uploading: false,
}

export default ProductForm;
