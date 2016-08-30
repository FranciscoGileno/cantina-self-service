import React from 'react';
import Category from './Category';
import CategoryAdd from './CategoryAdd';
import Loading from '../shared/Loading';

class CategoryList extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      categories: {},
      isDialogOpen: false,
      loading: true,
    }

    this.categoryRef = context.database.ref('categories');
    this.storage = context.storage;
  }

  componentDidMount() {
    this.categoryRef.off();

    this.categoryRef.once('value').then((snapshot) => {
      console.log(snapshot.val());
      this.setState({
        categories: snapshot.val(),
        loading: false
      });
    });
    window.componentHandler.upgradeDom();
  }

  render() {
    let categories = [];
    for (let category in this.state.categories) {
      if (this.state.categories.hasOwnProperty(category))
        categories.push(this.state.categories[category]);
    }
    const component = this.state.loading ? <Loading /> : (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {
          categories.map((item, index) => (
            <Category {...item} key={index} />
          ))
        }
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
