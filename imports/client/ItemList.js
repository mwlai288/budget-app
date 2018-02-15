import React, { Component } from 'react';
import styled from 'styled-components';

class ItemList extends Component {
  checkBox = () => {
    Meteor.call('toggleComplete', this.props.item);
  };
  deleteItem = () => {
    // new Confirmation(
    //   {
    //     message: 'Are you sure?',
    //     title: 'Confirmation',
    //     cancelText: 'Cancel',
    //     okText: 'Ok',
    //     success: true, // whether the button should be green or red
    //     focus: 'cancel' // which button to autofocus, "cancel" (default) or "ok", or "none"
    //   },
    //   function() {
    //     // ok is true if the user clicked on "ok", false otherwise
    //   }
    // );
    Meteor.call('deleteItem', this.props.item);
  };
  addMoney = e => {
    e.preventDefault();
    const amountAdded = this.refs.saved.value.trim();
    Meteor.call('addMoneyToBudget', this.props.item, amountAdded);
  };
  render() {
    const status = this.props.item.complete ? <span>Complete</span> : '';
    return (
      <ItemBorder>
        <input
          type="checkbox"
          readOnly={true}
          checked={this.props.item.complete}
          onClick={this.checkBox}
        />
        <ItemBox>
          Want: {this.props.item.goods}
          <br />
          Cost: ${this.props.item.price}
          <br />
          Saved: ${this.props.item.amountAdded}
          <br />
          Left: ${this.props.item.amountLeft}
        </ItemBox>
        <form onSubmit={this.addMoney}>
          <input type="number" step=".01" ref="saved" placeholder="add money" />
          <button onSubmit={this.addMoney}>Add Money</button>
        </form>
        {status}
        <button onClick={this.deleteItem}>&times;</button>
      </ItemBorder>
    );
  }
}

export default ItemList;

const ItemBorder = styled.div`
  margin-top: 20px;
  box-shadow: 2px 5px 7px #85bb65;
  background: #ffd700;
`;

const ItemBox = styled.div`
  display: flex;
  padding: 5px;
  font-size: 20px;
`;
