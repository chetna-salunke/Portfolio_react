/**
 * @file __tests__/Contact.test.tsx
 * @description Unit tests for the Contact form component.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from '../store/slices/portfolioSlice';
import Contact from '../components/Contact';

/** Helper — creates a fresh store for each test to avoid state bleed */
const makeStore = () =>
  configureStore({ reducer: { portfolio: portfolioReducer } });

const renderContact = () =>
  render(
    <Provider store={makeStore()}>
      <Contact />
    </Provider>
  );

describe('Contact component', () => {
  it('renders the contact section', () => {
    renderContact();
    expect(screen.getByTestId('contact')).toBeInTheDocument();
  });

  it('renders the name, email and message inputs', () => {
    renderContact();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('shows validation error when submitting empty form', () => {
    renderContact();
    fireEvent.click(screen.getByText(/Send Message/i));
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Name is required');
  });

  it('shows email error when name is filled but email is invalid', () => {
    renderContact();
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Chetna', name: 'name' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'notanemail', name: 'email' } });
    fireEvent.click(screen.getByText(/Send Message/i));
    expect(screen.getByRole('alert')).toHaveTextContent('valid email');
  });

  it('shows message error when message is too short', () => {
    renderContact();
    fireEvent.change(screen.getByLabelText(/name/i),    { target: { value: 'Chetna',          name: 'name'    } });
    fireEvent.change(screen.getByLabelText(/email/i),   { target: { value: 'c@test.com',       name: 'email'   } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hi',               name: 'message' } });
    fireEvent.click(screen.getByText(/Send Message/i));
    expect(screen.getByRole('alert')).toHaveTextContent('10 characters');
  });

  it('does not show error for a valid form submission', () => {
    renderContact();
    fireEvent.change(screen.getByLabelText(/name/i),    { target: { value: 'Chetna Salunke',          name: 'name'    } });
    fireEvent.change(screen.getByLabelText(/email/i),   { target: { value: 'chetna@email.com',         name: 'email'   } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hi, I have a great role for you!', name: 'message' } });
    fireEvent.click(screen.getByText(/Send Message/i));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
