import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter as Router } from 'react-router-dom';

import SigninForm from './SigninForm';

describe('SigninForm component', () => {
  it('renders two text fields', () => {
    render(
      <Router>
        <SigninForm />
      </Router>
    );

    const textFieldElements = screen.getAllByRole('textbox');
    expect(textFieldElements).toHaveLength(2);
  });

  it('renders "Email/Username" label', () => {
    render(
      <Router>
        <SigninForm />
      </Router>
    );

    const labelElement = screen.getByLabelText("Email/Username");
    expect(labelElement).toBeInTheDocument();
  });

  it('renders "Password" label', () => {
    render(
      <Router>
        <SigninForm />
      </Router>
    );

    const labelElement = screen.getByLabelText("Password");
    expect(labelElement).toBeInTheDocument();
  });

  it('renders one button', () => {
    render(
      <Router>
        <SigninForm />
      </Router>
    );

    const buttonElement = screen.getAllByRole('button');
    expect(buttonElement).toHaveLength(1);
  });

  it('renders "Sign in" as button text', () => {
    render(
      <Router>
        <SigninForm />
      </Router>
    );

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveTextContent("Sign in");
  });

  it('renders one link', () => {
    render(
      <Router>
        <SigninForm />
      </Router>
    );

    const linkElements = screen.getAllByRole('link');
    expect(linkElements).toHaveLength(1);
  });

  it('renders "Sign up here!" as link text', () => {
    render(
      <Router>
        <SigninForm />
      </Router>
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveTextContent("Sign up here!");
  });

  it('changes URL to "/signup" upon clicking "Sign up here!" link', () => {
    render(
      <Router>
        <SigninForm />
      </Router>
    );

    const linkElement = screen.getByRole('link');
    userEvent.click(linkElement)
    expect(global.window.location.href).toContain('/signup')
  });
});
