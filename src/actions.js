// src/actions.js

export const ADD_CONTACT = "ADD_CONTACT";
export const REMOVE_CONTACT = "REMOVE_CONTACT";

export const addContact = contact => {
  return {
    type: ADD_CONTACT,
    payload: contact
  };
};

export const removeContact = id => {
  return {
    type: REMOVE_CONTACT,
    payload: id
  };
};
