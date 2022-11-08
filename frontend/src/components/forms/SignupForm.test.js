import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter as Router } from 'react-router-dom';

import SignupForm from './SignupForm';

describe('SignupForm component', () => {
  it('renders three button', () => {
    render(
      <Router>
        <SignupForm />
      </Router>
    );

    const buttonElement = screen.getAllByRole('button');
    expect(buttonElement).toHaveLength(3);
  });

  it('renders one link', () => {
    render(
      <Router>
        <SignupForm />
      </Router>
    );

    const linkElements = screen.getAllByRole('link');
    expect(linkElements).toHaveLength(1);
  });

  it('renders "Sign up here!" as link text', () => {
    render(
      <Router>
        <SignupForm />
      </Router>
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveTextContent('Sign in here!');
  });

  it('changes URL to "/signin" upon clicking "Sign in here!" link', () => {
    render(
      <Router>
        <SignupForm />
      </Router>
    );

    const linkElement = screen.getByRole('link');
    userEvent.click(linkElement);
    expect(global.window.location.href).toContain('/signin');
  });
});
