import React from 'react';
import Category from './category';
import CategoryAdd from './category-add';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    const categoriesRef = this.context.database.ref('categories');
    categoriesRef.off();

    var setCategory = function(data) {
      this.setState({
        categories: [...this.state.categories, data.val()]
      });
    }.bind(this);

    categoriesRef.on('child_added', setCategory);
    categoriesRef.on('child_changed', setCategory);
  }

  render() {
    return (
      <div className="mdl-grid">
        {this.state.categories.map((item, index) => (
          <Category {...item} key={index} />
        ))}
        <CategoryAdd />
      </div>
    );
  }
};

CategoryList.contextTypes = {
  database: React.PropTypes.object
};

export default CategoryList;
