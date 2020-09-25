/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./App.css";

import {
  StoreProvider,
  action,
  createStore,
  computed,
  persist,
} from "easy-peasy";

import Routes from "./routers/Routes";

const contactModel = {
  //store variable
  contacts: [],
  //  👇 define an action to add a product to basket
  add: action((state, contact) => {
    state.contacts.push(contact);
  }),
  set: action((state, data) => {
    state.contacts = data;
  }),
  //  👇 define an action to remove a product from basket
  remove: action((state, index) => {
    state.contacts.splice(index, 1);
  }),
};

const loginModel = persist({
  // store variables
  user: null,
  isLoggedIn: computed((state) => state.user != null),

  //store actions
  setLogin: action((state, userdata) => {
    state.user = userdata;
  }),
  setLogout: action((state) => {
    state.user = null;
  }),
});

const storeModel = {
  contacts: contactModel,
  login: loginModel,
};

const storeData = createStore(storeModel);

function App() {
  return (
    <StoreProvider store={storeData}>
      <Routes />
    </StoreProvider>
  );
}

export default App;
