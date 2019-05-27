import React, { Component } from 'react';
import CategoryList from '../ui-elements/CategoryList';

export default class ManageCategories extends Component {
  render() {
    return (
      <div>
        <h1>Manage categories</h1>
        <CategoryList auth={this.props.auth}/>
      </div>
    )
  }
}
