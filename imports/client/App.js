import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';

import Items from '../api/items';
import ItemForm from './ItemForm';
import ItemList from './ItemList';
import About from './About';

class App extends Component {
  render() {
    return (
      <div>
        <Header>
          <HeaderContent>
            <div>Logo</div>
            <div>User SignUP/IN</div>
            <MBA>My Budget App</MBA>
          </HeaderContent>
        </Header>
        <Body>
          <Info>
            <About />
          </Info>
          <div>
            <ItemForm />
          </div>
          <ItemGrid>
            {this.props.items.map(item => {
              return <ItemList item={item} key={item._id} />;
            })}
          </ItemGrid>
        </Body>
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

const Header = styled.div`
  background: #b11247;
  position: fixed;
  width: 100%;
  height: 40px;
  top: 0;
`;
const HeaderContent = styled.header`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Body = styled.div`
  margin: 4rem auto;
  max-width: 930px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  color: #b11247;
  font-family: 'Cabin', sans-serif;
  font-size: 25px;
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 1rem auto;
  grid-gap: 5px;
  @media (min-width: 700px) {
    grid-gap: 28px;
  }
`;

const MBA = styled.h1`
  color: #ffffff;
`;
