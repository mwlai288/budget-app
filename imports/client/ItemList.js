import React, { Component } from 'react';

class ItemList extends Component {
  checkBox = () => {
    Meteor.call(
      'toggleComplete',
      this.props.item._id,
      this.props.item.complete
    );
  };
  deleteItem = () => {
    Meteor.call('deleteItem', this.props.item._id);
  };
  addMoney = e => {
    e.preventDefault();
    console.log(this.refs.saved.value);
    const amountAdded = this.refs.saved.value.trim();
    Meteor.call('addMoneyToBudget', this.props.item._id, amountAdded);
  };
  render() {
    return (
      <div>
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
          <input type="integer" ref="saved" placeholder="add money" />
          <button onSubmit={this.addMoney}>Add Money</button>
        </form>
        <button onClick={this.deleteItem}>&times;</button>
      </div>
    );
  }
}

export default ItemList;
