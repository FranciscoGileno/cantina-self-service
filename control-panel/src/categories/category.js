import React from 'react';
import Loading from '../Loading';

class Category extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      loading: true,
    }

    this.categoryRef = context.database.ref('categories');
    this.storage = context.storage;
  }

  componentDidMount() {
    this.storage.refFromURL(this.props.imageUrl).getMetadata().then((metadata) => {
      this.setState({
        imageUrl: metadata.downloadURLs[0],
        loading: false,
      })
    });
  }

  render() {
    const {name} = this.props;

    const component = this.state.loading ? <Loading /> : <img src={this.state.imageUrl} className="css-card__img" alt={name} />;

    return (
      <div className="mdl-card mdl-color mdl-shadow--2dp css-card">
        <div className="mdl-card__media mdl-card--border">
          {component}
        </div>
        <div className="mdl-card__title">
          <h6 className="mdl-card__title-text">{name}</h6>
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="">
            Block
          </a>
        </div>
      </div>
    );
  }
}

Category.contextTypes = {
  database: React.PropTypes.object,
  storage: React.PropTypes.object,
};

export default Category;
