import React, { Component } from 'react';
import styled from 'styled-components';

class ItemList extends Component {
  checkBox = () => {
    Meteor.call('toggleComplete', this.props.item);
  };
  deleteItem = () => {
    Meteor.call('deleteItem', this.props.item);
  };
  addMoney = e => {
    e.preventDefault();
    const amountAdded = this.refs.saved.value.trim();
    Meteor.call('addMoneyToBudget', this.props.item, amountAdded);
  };
  render() {
    return (
      <ItemBorder>
        <input
          type="checkbox"
          readOnly={true}
          checked={this.props.item.complete}
          onClick={this.checkBox}
        />
        Want: {this.props.item.goods}
        <br />
        Cost: ${this.props.item.price}
        <br />
        Saved: ${this.props.item.amountAdded}
        <br />
        Left: ${this.props.item.amountLeft}
        <form onSubmit={this.addMoney}>
          <input type="number" step=".01" ref="saved" placeholder="add money" />
          <button onSubmit={this.addMoney}>Add Money</button>
        </form>
        <button onClick={this.deleteItem}>&times;</button>
      </ItemBorder>
    );
  }
}

export default ItemList;

const ItemBorder = styled.div`
  margin-top: 20px;
  /* border: 1px solid black; */
  -moz-box-shadow: 3px 3px 5px 6px #ccc;
  -webkit-box-shadow: 3px 3px 5px 6px #ccc;
  box-shadow: 2px 0 15px -4px;
`;
