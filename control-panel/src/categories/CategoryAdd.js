import React from 'react';
import Dropzone from 'react-dropzone';
import placeholder from '../place-holder.png';

class CategoryAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null
    };
    this.onDrop = this.onDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onDrop(files) {
    this.setState({
      photo: files[0].preview
    });
  }

  onSubmit(event) {

  }

  render() {
    return (
      <div className="mdl-card mdl-color css-card">
        <form action="#" method="post" onSubmit={this.handleSubmit}>
          <div className="mdl-card__media">
            <Dropzone onDrop={this.onDrop} multiple={false} style={{border: 0}}>
              <img src={
                this.state.photo
                ? this.state.photo
                : placeholder
              } alt="Categoria" style={{width: 200, height: 200}} />
            </Dropzone>
          </div>
          <div className="mdl-card__title">
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="name" />
              <label className="mdl-textfield__label" htmlFor="name">Categoria</label>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CategoryAdd;
