import React, { Component } from 'react';
import Items from '../api/items';

class ItemForm extends Component {
  addItem = e => {
    e.preventDefault();
    const itemInput = this.refs.goods.value.trim();
    const priceInput = this.refs.price.value.trim();
    const amountAdded = this.refs.saved.value.trim();
    if (itemInput !== '' && priceInput !== '') {
      Meteor.call('addGoods', itemInput, priceInput, amountAdded, () => {
        this.refs.goods.value = '';
        this.refs.price.value = '';
      });
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={this.addItem}>
          <input
            type="text"
            ref="goods"
            placeholder="what do you want to buy?"
          />
          <br />
          <input type="integer" ref="price" placeholder="how much is it?" />
          <br />
          <input type="integer" ref="saved" placeholder="how much you saved?" />
          <br />
          <button onSubmit={this.addItem}>Add item</button>
        </form>
      </div>
    );
  }
}

export default ItemForm;
