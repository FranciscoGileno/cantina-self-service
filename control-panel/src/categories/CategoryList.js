import React from 'react';
import Category from './Category';
import CategoryAdd from './CategoryAdd';
import Loading from '../Loading';

class CategoryList extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      categories: [],
      isDialogOpen: false,
      loading: true,
    }

    this.categoryRef = context.database.ref('categories');
    this.storage = context.storage;
  }

  updateCategory = (category) => {
    this.setState({
      categories: [...this.state.categories, category ]
    });
  }

  componentDidMount() {
    this.categoryRef.off();

    var setCategory = (data) => {
      const category = data.val();
      this.updateCategory(category);
    };

    this.categoryRef.on('value', () => this.setState({ loading: false }));
    this.categoryRef.on('child_added', setCategory);
    this.categoryRef.on('child_changed', setCategory);
  }

  render() {
    const component = this.state.loading ? <Loading /> : (
      <div style={{display: 'flex'}}>
        {this.state.categories.map((item, index) => (
          <Category {...item} key={index} />
        ))}
        <CategoryAdd show={this.state.showModal} />
      </div>
    );
    return component;
  }
};

CategoryList.contextTypes = {
  database: React.PropTypes.object,
  storage: React.PropTypes.object,
};

export default CategoryList;
