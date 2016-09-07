import React from 'react';
import Dropzone from 'react-dropzone';
import PhotoPlaceHolder from '../shared/PhotoPlaceHolder';
import Uploading from '../shared/Uploading';
import FirebaseImage from '../shared/FirebaseImage';
import { Button, Card, CardTitle, Dialog, DialogActions, Textfield } from 'react-mdl';

class CategoryModal extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      uploading: false,
      name: props.category ? props.category.name : '',
    };

    this.categoriesRef = context.database.ref('categories');
    this.storage = context.storage;
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      name: nextProps.category ? nextProps.category.name : '',
    }
  }

  onDrop = (files) => {
    this.setState({
      file: files[0]
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.props.category) {
      this.updateCategory();
      return;
    }

    this.insertCategory();
  }

  insertCategory = () => {
    const categoryName = this.state.name;
    if (!(categoryName && this.state.file))
      // TODO: Não preenchido
      return;

    const categoryRef = this.categoriesRef.push({
      name: categoryName,
    });

    this.updateStorage(categoryRef);
  }

  updateCategory = () => {
    const categoryName = this.state.name;
    if (!categoryName)
      // TODO: Não preenchido
      return;

    const categoryRef = this.categoriesRef.child(this.props.category.id);
    categoryRef.update({
      name: categoryName,
    });

    if (this.state.file) {
      this.updateStorage(categoryRef);
      return;
    }

    this.finishSubmit();
  }

  updateStorage = (categoryRef) => {
    const file = this.state.file;
    const uploadTask = this.storage.ref(`categories/${file.name}`).put(file, {'contentType': file.type});
    this.setState({ uploading: true });
    uploadTask.on('state_changed', null, null, () => {
      const filePath = uploadTask.snapshot.metadata.fullPath;
      categoryRef.update({ imageUrl: this.storage.ref(filePath).toString() });
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
    const { name, file, uploading } = this.state;
    const { category, show } = this.props;
    const img = file
      ? <img src={file.preview} alt="Categoria" style={{width: 280, height: 280}} />
      : category
        ? <FirebaseImage storageUrl={category.imageUrl} />
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
                <Textfield ref="categoryName" disabled={uploading} floatingLabel label="Categoria" id="name"
                  value={name} onChange={(event) => this.setState({name: event.target.value})} />
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

CategoryModal.propTypes = {
  category: React.PropTypes.object,
  onAdded: React.PropTypes.func,
  onClose: React.PropTypes.func,
  show: React.PropTypes.bool,
}

CategoryModal.contextTypes = {
  database: React.PropTypes.object,
  storage: React.PropTypes.object,
};

export default CategoryModal;
