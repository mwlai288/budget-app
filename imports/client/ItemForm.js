import React, { Component } from 'react';
import Items from '../api/items';

class ItemForm extends Component {
  addItem = e => {
    e.preventDefault();
    const itemInput = this.refs.goods.value.trim();
    const priceInput = this.refs.price.value.trim();
    const amountAdded = this.refs.saved.value.trim();
    if (itemInput !== '' && priceInput !== '') {
      Items.insert({
        goods: itemInput,
        price: priceInput,
        amountAdded: amountAdded,
        amountLeft: priceInput - amountAdded,
        complete: false,
        createdAt: new Date()
      });
    }
    this.refs.goods.value = '';
    this.refs.price.value = '';
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
          <input type="text" ref="price" placeholder="how much is it?" />
          <br />
          <input type="text" ref="saved" placeholder="how much you saved?" />
          <br />
          <button onSubmit={this.addItem}>Add item</button>
        </form>
      </div>
    );
  }
}

export default ItemForm;
