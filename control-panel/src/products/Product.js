import React from 'react';
import FirebaseImage from '../shared/FirebaseImage';
import { Card, CardActions, Switch } from 'react-mdl';
import classnames from 'classnames';

class Product extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      loading: true,
      active: props.active,
    }

    this.productRef = context.database.ref(`products/${this.props.id}`);
  }

  handleClick = () => {
    const { onClick, ...props } = this.props; // eslint-disable-line no-unused-vars
    this.props.onClick(props);
  }

  handleActivation = () => {
    const newStatus = !this.state.active;
    this.productRef.child('active').set(newStatus);
    this.setState({
      active: newStatus
    });
  }

  render() {
    const {name, price, categoryId, categories, imageUrl} = this.props;
    const { active } = this.state;

    const categoryName = categoryId ? categories.find((category) => category.key === categoryId).name : '';

    const cardClassNames = classnames({
      'css-card': true,
      'css-card--selectable': true,
      'css-card--disabled': !active,
    });

    return (
      <Card shadow={2} className={cardClassNames} tabIndex={0}>
        <div onClick={this.handleClick}>
          <FirebaseImage storageUrl={imageUrl} />
          <div className="css-card__data">
            <h2 className="mdl-card__title-text">
              {name}
            </h2>
            <div className="mdl-card__title-text">
              R$ {price}
            </div>
            <div className="css-card__highlight mdl-color--grey-200">
              {categoryName}
            </div>
          </div>
        </div>
        <CardActions border>
          <Switch checked={active} ripple onChange={this.handleActivation} />
        </CardActions>
      </Card>
    );
  }
}

Product.contextTypes = {
  database: React.PropTypes.object,
};

Product.propTypes = {
  categories: React.PropTypes.array,
}

export default Product;
