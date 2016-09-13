import React from 'react';
import FirebaseImage from '../shared/FirebaseImage';
import { Card, CardTitle } from 'react-mdl';

class Product extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      loading: true,
    }

    this.categoryRef = context.database.ref('categories');
  }

  handleClick = () => {
    const { id, name, imageUrl, price } = this.props;
    this.props.onClick({ id, name, imageUrl, price });
  }

  render() {
    const {name, price, imageUrl} = this.props;
    return (
      <Card shadow={2} className="css-card css-card--selectable" onClick={this.handleClick} tabIndex={0}>
        <FirebaseImage storageUrl={imageUrl} />
        <CardTitle>
          {name}
        </CardTitle>
        <CardTitle>
          R$ {price}
        </CardTitle>
      </Card>
    );
  }
}

Product.contextTypes = {
  database: React.PropTypes.object,
};

export default Product;
