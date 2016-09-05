import React from 'react';
import Dropzone from 'react-dropzone';
import PhotoPlaceHolder from '../shared/PhotoPlaceHolder';
import Uploading from '../shared/Uploading';
import { Button, Card, CardTitle, Dialog, DialogActions, Textfield } from 'react-mdl';

class CategoryModal extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      name: props.name || '',
      file: null,
      uploading: false,
    };

    this.categoryRef = context.database.ref('categories');
    this.storage = context.storage;
  }

  componentWillReceiveProps(nextProps) {

    this.setState({ name: nextProps.name});
    this.updateImage();
  }

  componentDidMount() {
    this.updateImage();
  }

  updateImage() {
    if (this.props.imageUrl) {
      this.storage.refFromURL(this.props.imageUrl).getMetadata().then((metadata) => {
        this.setState({
          imageUrl: metadata.downloadURLs[0],
          loading: false,
        })
      });
    }
  }

  onDrop = (files) => {
    this.setState({
      file: files[0]
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const categoryName = this.state.name;
    if (categoryName && this.state.file) {
      this.categoryRef.push({
        name: categoryName,
      }).then((data) => {
        const file = this.state.file;
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
          this.props.onAdded();
        });
      });
    }
  }

  resetForm = () => {
    this.setState({
      file: null,
      imageUrl: '',
      name: '',
    });
  }

  close = () => {
    this.resetForm();
    this.props.onClose();
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    });
  }

  render() {
    const { name, file, imageUrl, uploading } = this.state;
    const { show } = this.props;

    console.log(file, imageUrl);
    const img = file ? file.preview : imageUrl;
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
                        ? <img src={img} alt="Categoria" style={{width: 280, height: 280}} />
                        : <PhotoPlaceHolder />
                    }
                    </Dropzone>
                  )
                }
              </div>
              <CardTitle>
                <Textfield ref="categoryName" disabled={uploading} floatingLabel label="Categoria" id="name" value={name} onChange={this.handleNameChange} />
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

CategoryModal.contextTypes = {
  database: React.PropTypes.object,
  storage: React.PropTypes.object,
};

export default CategoryModal;
