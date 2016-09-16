import React from 'react';
import FirebaseImage from '../shared/FirebaseImage';
import { Card, CardActions, Switch } from 'react-mdl';

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
    const { id, name, imageUrl } = this.props;
    this.props.onClick({ id, name, imageUrl });
  }

  handleActivation = () => {
    const newStatus = !this.state.active;
    this.productRef.child('active').set(newStatus);
    this.setState({
      active: newStatus
    });
  }

  render() {
    const {name, imageUrl} = this.props;
    const { active } = this.state;
    return (
      <Card shadow={2} className="css-card css-card--selectable" tabIndex={0}>
        <div onClick={this.handleClick}>
          <FirebaseImage storageUrl={imageUrl} disabled={!active} />
          <div>
            <h2 class="mdl-card__title">
              {name}
            </h2>
            <div>
              ops
            </div>
          </div>
        </div>
        <CardActions border style={{textAlign: 'right'}}>
          <Switch checked={active} ripple onChange={this.handleActivation} />
        </CardActions>
      </Card>
    );
  }
}

Product.contextTypes = {
  database: React.PropTypes.object,
};

export default Product;
