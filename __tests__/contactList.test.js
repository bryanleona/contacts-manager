import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ContactList from '../src/ContactList';
import { MemoryRouter } from 'react-router-dom';
import { toBeInTheDocument } from '@testing-library/jest-dom'

const mockStore = configureStore([]);

describe('ContactList component', () => {
  afterEach(cleanup);

  it('renders the component', () => {
    const contacts = [
      {
        name: 'John Doe',
        eKTPNumber: '123456789',
        address: 'Jakarta',
        job: 'Software Engineer',
        dateOfBirth: '01/01/2000',
        phoneNumbers: ['08123456789'],
        familyMembers: [
          {
            name: 'Jane Doe',
            dateOfBirth: '02/01/2002',
            relationshipStatus: 'Sister'
          }
        ]
      }
    ];
    const store = mockStore({ contacts });

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <ContactList />
      </Provider>
    , {wrapper: MemoryRouter});
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('123456789')).toBeInTheDocument();
    expect(getByText('Jakarta')).toBeInTheDocument();
    expect(getByText('Software Engineer')).toBeInTheDocument();
    expect(getByText('01/01/2000')).toBeInTheDocument();
    expect(getByText('08123456789')).toBeInTheDocument();
    expect(getByText('Jane Doe')).toBeInTheDocument();
    expect(getByText('02/01/2002')).toBeInTheDocument();
    expect(getByText('Sister')).toBeInTheDocument();
  });
});
