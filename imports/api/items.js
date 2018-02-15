import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Items = new Mongo.Collection('items');

if (Meteor.isServer) {
  Meteor.publish('allItems', function() {
    return Items.find();
  });

  Meteor.publish('userItems', function() {
    return Items.find({ user: this.userId });
  });

  Meteor.methods({
    addGoods(itemInput, priceInput, amountAdded) {
      check(itemInput, String);
      if (!Meteor.userId()) {
        throw new Meteor.Error('not authorized.');
      }
      Items.insert({
        goods: itemInput,
        price: parseInt(priceInput),
        amountAdded: parseInt(amountAdded),
        amountLeft: parseInt(priceInput) - parseInt(amountAdded),
        complete: false,
        createdAt: new Date(),
        user: Meteor.userId()
      });
    },
    toggleComplete(item) {
      if (Meteor.userId() !== item.user) {
        throw new Meteor.Error('not authorized.');
      }
      Items.update(item._id, {
        $set: { complete: !item.complete }
      });
    },

    addMoneyToBudget(item, amountAdded) {
      if (Meteor.userId() !== item.user) {
        throw new Meteor.Error('not authorized.');
      }
      Items.update(item._id, {
        $inc: {
          amountLeft: -parseInt(amountAdded),
          amountAdded: parseInt(amountAdded)
        }
      });
    },
    deleteItem(item) {
      if (Meteor.userId() !== item.user) {
        throw new Meteor.Error('not authorized.');
      }
      Items.remove(item._id);
    }
  });
}

export default Items;
