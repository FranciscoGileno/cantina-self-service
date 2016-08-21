import React from 'react';
import Dropzone from 'react-dropzone';
import PhotoPlaceHolder from '../shared/PhotoPlaceHolder';

class CategoryAdd extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      photo: null
    };

    this.categoryRef = context.database.ref('categories');
    this.storage = context.storage;
  }

  onDrop = (files) => {
    this.setState({
      photo: files[0]
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.refs.name && this.state.photo) {
      this.categoryRef.push({
        name: this.refs.name.value,
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
    this.refs.categoryDialog.showModal();
  }

  handleCancelClick = (event) => {
    this.refs.categoryDialog.close();
  }

  close = () => {
    this.refs.categoryDialog.close();
  }

  render() {
    return (
      <div>
        <dialog className="mdl-dialog css-dialog" ref="categoryDialog">
          <form action="#" method="post" onSubmit={this.onSubmit}>
            <div className="mdl-dialog__content">
              <div className="mdl-card mdl-color css-card">
                <div className="mdl-card__media" style={{backgroundColor: 'white'}}>
                  <Dropzone onDrop={this.onDrop} multiple={false} style={{border: 0, cursor: 'pointer'}}>
                    {
                      this.state.photo
                      ? <img src={this.state.photo.preview} alt="Categoria" style={{width: 200, height: 200}} />
                      : <PhotoPlaceHolder />
                    }
                  </Dropzone>
                </div>
                <div className="mdl-card__title">
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="text" id="name" ref="name" />
                    <label className="mdl-textfield__label" htmlFor="name">Categoria</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="mdl-dialog__actions">
              <button type="submit" className="mdl-button mdl-button--raised mdl-button--colored">Salvar</button>
              <button type="button" className="mdl-button" onClick={this.handleCancelClick}>Cancel</button>
            </div>
          </form>
        </dialog>
        <button className="css-fab mdl-button mdl-js-button mdl-button--fab mdl-button--colored" onClick={this.handleNewItem}>
          <i className="material-icons">add</i>
        </button>
      </div>
    );
  }
}

CategoryAdd.contextTypes = {
  database: React.PropTypes.object,
  storage: React.PropTypes.object,
};

export default CategoryAdd;
