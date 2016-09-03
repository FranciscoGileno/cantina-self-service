import React from 'react';
import Dropzone from 'react-dropzone';
import PhotoPlaceHolder from '../shared/PhotoPlaceHolder';
import Uploading from '../shared/Uploading';
import { FABButton, Button, Card, CardTitle, Icon, Dialog, DialogActions, Textfield } from 'react-mdl';

class CategoryAdd extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      dialogOpen: false,
      photo: null,
      uploading: false,
    };

    this.categoryRef = context.database.ref('categories');
    this.storage = context.storage;
  }

  onDrop = (files) => {
    this.setState({
      photo: files[0]
    });
  }

  clearForm = () => {
    this.setState({ photo: null });
    this.refs.categoryName.inputRef.value = null;
  }

  onSubmit = (event) => {
    const categoryName = this.refs.categoryName.inputRef.value;
    event.preventDefault();
    if (categoryName && this.state.photo) {
      this.categoryRef.push({
        name: categoryName,
      }).then((data) => {
        const file = this.state.photo;

        // Upload the image to Firebase Storage.
        const uploadTask = this.storage.ref('categories/' + file.name)
          .put(file, {'contentType': file.type});

        // Listen for upload completion.
        this.setState({ uploading: true });
        uploadTask.on('state_changed', null, (error) => {
          console.error('There was an error uploading a file to Firebase Storage:', error);
        }, () => {
          this.setState({ uploading: false });
          const filePath = uploadTask.snapshot.metadata.fullPath;
          data.update({ imageUrl: this.storage.ref(filePath).toString() });
          this.close();
          this.clearForm();
          this.props.onAdd();
        });
      });
    }
  }

  handleNewItem = (event) => {
    this.setState({ dialogOpen: true });
  }

  handleCancelClick = (event) => {
    this.close();
  }

  close = () => {
    this.setState({ dialogOpen: false });
  }

  render() {
    const { photo, dialogOpen, uploading } = this.state;
    return (
      <div>
        <Dialog open={dialogOpen} style={{width: 320}}>
          <form action="#" method="post" onSubmit={this.onSubmit}>
            <Card className="css-card">
              <div style={{height: 280, with: 280, position: 'relative'}}>
                { uploading ?
                  <Uploading /> :
                  (
                    <Dropzone onDrop={this.onDrop} multiple={false} style={{border: 0, cursor: 'pointer'}}>
                    {
                      photo
                      ? <img src={photo.preview} alt="Categoria" style={{width: 280, height: 280}} />
                      : <PhotoPlaceHolder />
                    }
                    </Dropzone>
                  )
                }
              </div>
              <CardTitle>
                <Textfield ref="categoryName" disabled={uploading} floatingLabel label="Categoria" id="name" />
              </CardTitle>
            </Card>
            <DialogActions>
              <Button raised colored disabled={uploading}>Salvar</Button>
              <Button onClick={this.handleCancelClick}>Cancel</Button>
            </DialogActions>
          </form>
        </Dialog>
        <FABButton className="css-fab" colored onClick={this.handleNewItem}>
          <Icon name="add" />
        </FABButton>
      </div>
    );
  }
}

CategoryAdd.contextTypes = {
  database: React.PropTypes.object,
  storage: React.PropTypes.object,
};

export default CategoryAdd;
