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
    const index = this.state.categories.map(c => c.name).indexOf(category.name);
    let categories;

    if (index === -1) {
      categories = [...this.state.categories, category ];
    } else {
      categories = [...this.state.categories.slice(0, index), category, ...this.state.categories.slice(index+1)];
    }

    this.setState({
      categories: categories
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
    window.componentHandler.upgradeDom();

  }

  render() {
    const component = this.state.loading ? <Loading /> : (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
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
