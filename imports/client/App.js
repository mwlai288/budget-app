import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Items from '../api/items';
import ItemForm from './ItemForm';
import ItemList from './ItemList';

class App extends Component {
  render() {
    return (
      <div>
        <h1>My Budget App</h1>
        <ItemForm />
        {this.props.items.map(item => {
          return <ItemList item={item} key={item._id} />;
        })}
      </div>
    );
  }
}

export default withTracker(() => {
  let itemsSub = Meteor.subscribe('allItems');
  return {
    items: Items.find({}).fetch()
  };
})(App);
