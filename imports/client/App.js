import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Items from '../api/items';
import ItemForm from './ItemForm';
import ItemList from './ItemList';
import About from './About';
import AccountsUI from './AccountsUI';

class App extends Component {
  render() {
    return (
      <div>
        <Header>
          <HeaderContent>
            <LogoStyle>$+$$=$$$</LogoStyle>
            <div>
              <AccountsUI />
            </div>
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
          {/* <ReactCSSTransitionGroup
            transitionName="itemAnimate"
            transitionEnterTimeout={600}
            transitionLeaveTimeout={400}
          > */}
          <ItemGrid>
            {this.props.items.map(item => {
              return <ItemList item={item} key={item._id} />;
            })}
          </ItemGrid>
          {/* </ReactCSSTransitionGroup> */}
        </Body>
      </div>
    );
  }
}

export default withTracker(() => {
  let itemsSub = Meteor.subscribe('userItems');
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
  @media (max-width: 295px) {
    display: flex;
    flex-direction: column;
    height: 100px;
  }
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
  font-family: 'Passion One', cursive;
`;

const LogoStyle = styled.div`
  font-family: 'Passion One', cursive;
  color: #ffffff;
  font-size: 30px;
`;
