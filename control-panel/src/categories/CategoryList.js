import React from 'react';
import Category from './Category';
import CategoryAdd from './CategoryAdd';
import CategoryModal from './CategoryModal';
import Loading from '../shared/Loading';

class CategoryList extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      categories: {},
      loading: true,
      showModal: false,
    }

    this.categoryRef = context.database.ref('categories');
    this.storage = context.storage;
  }

  componentDidMount() {
    this.update();
  }

  update = () => {
    this.categoryRef.off();
    this.categoryRef.once('value').then((snapshot) => {
      this.setState({
        categories: snapshot.val(),
        loading: false,
        showModal: false,
      });
    });
  }

  handleCategoryEdit = (category) => {
    this.setState({
      categoryToEdit: category,
      showModal: true,
    })
  }

  handleCloseClick = () => {
    this.setState({ showModal: false });
  }

  handleAddClick = () => {
    this.setState({
      categoryToEdit: null,
      showModal: true,
    });
  }

  render() {
    let categories = [];
    for (let category in this.state.categories) {
      if (this.state.categories.hasOwnProperty(category))
        categories.push({...this.state.categories[category], id: category});
    }
    const component = this.state.loading ? <Loading /> : (
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {
          categories.map((item, index) => (
            <Category {...item} key={index} onClick={this.handleCategoryEdit} />
          ))
        }
        <div>
          <CategoryModal category={this.state.categoryToEdit} show={this.state.showModal} onAdded={this.update} onClose={this.handleCloseClick} />
          <CategoryAdd onClick={this.handleAddClick} />
        </div>
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
