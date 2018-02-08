import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Items from '../api/items';

class App extends Component {
  addItem = e => {
    e.preventDefault();
    const itemInput = this.refs.item.value.trim();
    const priceInput = this.refs.price.value.trim();
    if (itemInput !== '' && priceInput !== '') {
      Items.insert({
        item: itemInput,
        price: priceInput,
        complete: false,
        createdAt: new Date()
      });
    }
    this.refs.item.value = '';
    this.refs.price.value = '';
  };
  render() {
    return (
      <div>
        <h1>My Budget App</h1>
        <form onSubmit={this.addItem}>
          <input
            type="text"
            ref="item"
            placeholder="what do you want to buy?"
          />
          <br />
          <input type="text" ref="price" placeholder="how much is it?" />
          <br />
          <button onSubmit={this.addItem}>Add item</button>
        </form>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    items: Items.find({}).fetch()
  };
})(App);
