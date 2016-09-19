import React from 'react';
import FirebaseImage from '../shared/FirebaseImage';
import { Card, CardActions, Switch } from 'react-mdl';
import classnames from 'classnames';

class Category extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      loading: true,
      active: props.active,
    }

    this.categoryRef = context.database.ref(`categories/${this.props.id}`);
  }

  handleClick = () => {
    const { id, name, imageUrl } = this.props;
    this.props.onClick({ id, name, imageUrl });
  }

  handleActivation = () => {
    const newStatus = !this.state.active;
    this.categoryRef.child('active').set(newStatus);
    this.setState({
      active: newStatus
    });
  }

  render() {
    const {name, imageUrl} = this.props;
    const { active } = this.state;

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
          </div>
        </div>
        <CardActions border style={{textAlign: 'right'}}>
          <Switch checked={active} ripple onChange={this.handleActivation} />
        </CardActions>
      </Card>
    );
  }
}

Category.contextTypes = {
  database: React.PropTypes.object,
};

export default Category;
