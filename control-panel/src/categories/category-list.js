import React from 'react';
import Category from './category';
import CategoryAdd from './category-add';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isDialogOpen: false
    }

    this.handleNewItem = this.handleNewItem.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
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

  handleNewItem(event) {
    this.setState({
      isDialogOpen: true
    });
  }

  handleCancelClick(event) {
    this.setState({
      isDialogOpen: false
    });
  }

  render() {
    return (
      <div className="mdl-grid">
        {this.state.categories.map((item, index) => (
          <Category {...item} key={index} />
        ))}
        <dialog className="mdl-dialog" open={this.state.isDialogOpen}>
            <div className="mdl-dialog__content">
              <CategoryAdd />
            </div>
            <div className="mdl-dialog__actions">
              <button type="button" className="mdl-button mdl-button--raised mdl-button--colored">Salvar</button>
              <button type="button" className="mdl-button" onClick={this.handleCancelClick}>Cancel</button>
            </div>
          </dialog>
        <button className="css-fab mdl-button mdl-js-button mdl-button--fab mdl-button--colored" onClick={this.handleNewItem}>
          <i className="material-icons">add</i>
        </button>
      </div>
    );
  }
};

CategoryList.contextTypes = {
  database: React.PropTypes.object
};

export default CategoryList;
