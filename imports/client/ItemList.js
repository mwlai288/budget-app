import React, { Component } from 'react';

class ItemList extends Component {
  render() {
    return (
      <div>
        To buy: {this.props.item.goods}
        <br />
        This costs:${this.props.item.price}
        <br /> How much you need left:${this.props.item.amountLeft}
      </div>
    );
  }
}

export default ItemList;
