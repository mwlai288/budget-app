import React, { Component } from 'react';
import Items from '../api/items';
import styled from 'styled-components';

class ItemForm extends Component {
  addItem = e => {
    e.preventDefault();
    const itemInput = this.refs.goods.value.trim();
    const priceInput = this.refs.price.value.trim();
    const amountAdded = this.refs.saved.value.trim();
    if (itemInput !== '' && priceInput !== '' && amountAdded !== '') {
      Meteor.call('addGoods', itemInput, priceInput, amountAdded, () => {
        this.refs.goods.value = '';
        this.refs.price.value = '';
        this.refs.saved.value = '';
      });
    }
  };
  render() {
    return (
      <div>
        <FormStyle onSubmit={this.addItem}>
          <input
            type="textarea"
            ref="goods"
            placeholder="what do you want to buy?"
          />
          <input type="number" ref="price" placeholder="how much is it?" />
          <input type="number" ref="saved" placeholder="how much you saved?" />
          <button onSubmit={this.addItem}>Add item</button>
        </FormStyle>
      </div>
    );
  }
}

export default ItemForm;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  -moz-box-shadow: 3px 3px 5px 6px #ccc;
  -webkit-box-shadow: 3px 3px 5px 6px #ccc;
  box-shadow: 3px 3px 5px 6px #808000;
`;
