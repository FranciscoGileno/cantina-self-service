import React from 'react';
import Dropzone from 'react-dropzone';
import PhotoPlaceHolder from '../shared/PhotoPlaceHolder';
import Uploading from '../shared/Uploading';
import FirebaseImage from '../shared/FirebaseImage';
import { Button, Card, Dialog, DialogActions, Textfield } from 'react-mdl';

class CategoryModal extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      uploading: false,
    };

    this.categoriesRef = context.database.ref('categories');
    this.storage = context.storage;
    this.isEditing = false;
  }

  componentWillReceiveProps(nextProps) {
    this.isEditing = nextProps.category ? true : false;
    this.name.inputRef.value = nextProps.category ? nextProps.category.name : '';
  }

  onDrop = (files) => {
    this.setState({
      file: files[0]
    });
  }

  isDataValid = (cb) => {
    const categoryName = this.name.inputRef.value;
    if (this.isEditing && !categoryName)
      cb(false);
    if (!this.isEditing && (!categoryName || !this.state.file))
      cb(false);

    this.updateIndexAndReturnIfDataExists(categoryName, cb);
  }

  updateIndexAndReturnIfDataExists = (categoryName, cb) => {
    categoryName = categoryName.toLowerCase();
    const previousCategoryName = this.isEditing ? this.props.category.name.toLowerCase() : '';
    const categoryNameRef = this.context.database.ref(`categoryNames/${categoryName}`);
    categoryNameRef.transaction((currentData) => {
      if (currentData !== null && !this.isEditing)
        return;
      if (currentData !== null && previousCategoryName !== categoryName)
        return;

      return true;
    }, (error, commited, snapshot) => {
      if (error) {
        return cb(false, error);
      } else if (!commited) {
        return cb(false, "Já existe");
      } else {
        if (this.isEditing && categoryName !== previousCategoryName) {
          this.context.database.ref(`categoryNames/${previousCategoryName}`).remove();
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

      const categoryName = this.name.inputRef.value;
      if (this.isEditing) {
        this.updateCategory(categoryName);
        return;
      }

      this.insertCategory(categoryName);
    });
  }

  insertCategory = (categoryName) => {
    const categoryRef = this.categoriesRef.push({
      name: categoryName,
      active: false,
    });

    this.updateStorage(categoryRef);
  }

  updateCategory = (categoryName) => {
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
              <div>
                <Textfield ref={(c) => this.name = c } disabled={uploading} floatingLabel
                  error={error} onChange={() => this.setState({ error: null })}
                  label="Categoria" />
              </div>
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
