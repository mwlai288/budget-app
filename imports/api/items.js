import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Items = new Mongo.Collection('items');

if (Meteor.isServer) {
  Meteor.publish('allItems', function() {
    return Items.find();
  });

  Meteor.methods({
    addGoods(itemInput, priceInput, amountAdded) {
      Items.insert({
        goods: itemInput,
        price: parseInt(priceInput),
        amountAdded: parseInt(amountAdded),
        amountLeft: parseInt(priceInput) - parseInt(amountAdded),
        complete: false,
        createdAt: new Date()
      });
    },
    toggleComplete(id, status) {
      Items.update(id, {
        $set: { complete: !status }
      });
    },
    addMoneyToBudget(id, amountAdded) {
      Items.update(id, {
        $inc: {
          amountLeft: -parseInt(amountAdded),
          amountAdded: parseInt(amountAdded)
        }
      });
    },
    deleteItem(id) {
      Items.remove(id);
    }
  });
}

export default Items;
