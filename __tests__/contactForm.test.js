import ContactForm from '../src/ContactForm';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import store from '../src/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


test('submitting the form should add a new contact', () => {
  const dispatch = jest.fn();
  const { getByPlaceholderText, getByText, getByRole } = render(
    <Router path='/form'>
      <Provider store={store}>
        <ContactForm dispatch={dispatch} />
      </Provider>
    </Router>
    );

  fireEvent.change(getByPlaceholderText('Enter Your Name'), { target: { value: 'John Doe' } });
  fireEvent.change(getByPlaceholderText('Enter Your E-KTP Number'), { target: { value: '1234567890' } });
  fireEvent.change(getByPlaceholderText('Enter Your Address'), { target: { value: 'Jakarta, Indonesia' } });
  fireEvent.change(getByPlaceholderText('Enter Your Job'), { target: { value: 'Software Engineer' } });
  fireEvent.change(getByPlaceholderText('Enter Your Phone Numbers (Example: 085159662842, 089638408251)'), { target: { value: '081234567890, 082345678901' } });
  fireEvent.submit(getByText('Submit'));

  expect(dispatch).toHaveBeenCalledWith({
    type: 'ADD_CONTACT',
    payload: {
      name: 'John Doe',
      eKTPNumber: '1234567890',
      address: 'Jakarta, Indonesia',
      job: 'Software Engineer',
      phoneNumbers: ['081234567890', '082345678901'],
      familyMembers: [{ name: '', dateOfBirth: '', relationshipStatus: '' }]
    }
  });
});
