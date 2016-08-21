import React from 'react';
import Category from './Category';
import CategoryAdd from './CategoryAdd';

class CategoryList extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      categories: [],
      isDialogOpen: false
    }

    this.categoryRef = context.database.ref('categories');
    this.storage = context.storage;
  }

  updateCategory = (category, imageUrl) => {
    this.setState({
      categories: [...this.state.categories, {...category, imageUrl: imageUrl } ]
    });
  }

  componentDidMount() {
    this.categoryRef.off();

    var setCategory = (data) => {
      const category = data.val();
      if (category.imageUrl) {
        this.storage.refFromURL(category.imageUrl).getMetadata().then((metadata) => {
          this.updateCategory(category, metadata.downloadURLs[0]);
        });
      } else {
        this.updateCategory(category, null);
      }
    };

    this.categoryRef.on('child_added', setCategory);
    this.categoryRef.on('child_changed', setCategory);
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        {this.state.categories.map((item, index) => (
          <Category {...item} key={index} />
        ))}
        <CategoryAdd show={this.state.showModal} />
      </div>
    );
  }
};

CategoryList.contextTypes = {
  database: React.PropTypes.object,
  storage: React.PropTypes.object,
};

export default CategoryList;
