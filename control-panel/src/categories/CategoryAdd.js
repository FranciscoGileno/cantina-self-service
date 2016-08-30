import React from 'react';
import Dropzone from 'react-dropzone';
import PhotoPlaceHolder from '../shared/PhotoPlaceHolder';
import { FABButton, Button, Card, CardTitle, Icon, Dialog, DialogActions, Textfield } from 'react-mdl';

class CategoryAdd extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      dialogOpen: false,
      photo: null,
    };

    this.categoryRef = context.database.ref('categories');
    this.storage = context.storage;
  }

  onDrop = (files) => {
    this.setState({
      photo: files[0]
    });
  }

  handleCategoryNameChange = (event) => {
    this.categoryName = event.target.value;
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.categoryName);
    if (this.categoryName && this.state.photo) {
      this.categoryRef.push({
        name: this.categoryName,
      }).then((data) => {
        const file = this.state.photo;

        // Upload the image to Firebase Storage.
        const uploadTask = this.storage.ref('categories/' + file.name)
          .put(file, {'contentType': file.type});

        // Listen for upload completion.
        uploadTask.on('state_changed', null, (error) => {
          console.error('There was an error uploading a file to Firebase Storage:', error);
        }, () => {
          const filePath = uploadTask.snapshot.metadata.fullPath;
          data.update({ imageUrl: this.storage.ref(filePath).toString() });
          this.close();
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
    return (
      <div>
        <Dialog open={this.state.dialogOpen} style={{width: 320}}>
          <form action="#" method="post" onSubmit={this.onSubmit}>
            <Card className="css-card">
              <Dropzone onDrop={this.onDrop} multiple={false} style={{border: 0, cursor: 'pointer'}}>
                {
                  this.state.photo
                  ? <img src={this.state.photo.preview} alt="Categoria" style={{width: 280, height: 280}} />
                  : <PhotoPlaceHolder />
                }
              </Dropzone>
              <CardTitle>
                <Textfield floatingLabel label="Categoria" id="name" onChange={this.handleCategoryNameChange} />
              </CardTitle>
            </Card>
            <DialogActions>
              <Button raised colored>Salvar</Button>
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
