import React from 'react';
import Loading from '../shared/Loading';
import { Card, CardTitle } from 'react-mdl';

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

  handleClick = () => {
    const { id, name, imageUrl } = this.props;
    this.props.onClick({ id, name, imageUrl });
  }

  render() {
    const {name} = this.props;
    const component = this.state.loading ? <div className="css-card__img"><Loading /></div> : <img src={this.state.imageUrl} className="css-card__img" alt={name} />;

    return (
      <Card shadow={2} className="css-card" onClick={this.handleClick} tabIndex={0}>
        {component}
        <CardTitle>
          <h6 className="mdl-card__title-text">{name}</h6>
        </CardTitle>
      </Card>
    );
  }
}

Category.contextTypes = {
  database: React.PropTypes.object,
  storage: React.PropTypes.object,
};

export default Category;
