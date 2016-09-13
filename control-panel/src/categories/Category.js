import React from 'react';
import FirebaseImage from '../shared/FirebaseImage';
import { Card, CardActions, CardTitle, Switch } from 'react-mdl';

class Category extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      loading: true,
      active: props.active,
    }

    this.categoryRef = context.database.ref('categories');
  }

  handleClick = () => {
    const { id, name, imageUrl } = this.props;
    this.props.onClick({ id, name, imageUrl });
  }

  render() {
    const {name, imageUrl} = this.props;
    const { active } = this.state;
    return (
      <Card shadow={2} className="css-card css-card--selectable" tabIndex={0}>
        <div onClick={this.handleClick}>
          <FirebaseImage storageUrl={imageUrl} disabled={!active} />
          <CardTitle>
            {name}
          </CardTitle>
        </div>
        <CardActions border style={{textAlign: 'right'}}>
          <Switch checked={active} ripple onChange={() => this.setState({active: !this.state.active})} />
        </CardActions>
      </Card>
    );
  }
}

Category.contextTypes = {
  database: React.PropTypes.object,
};

export default Category;
