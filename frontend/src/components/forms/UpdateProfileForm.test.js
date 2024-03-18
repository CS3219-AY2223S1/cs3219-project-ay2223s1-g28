import { render, screen } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';

import UpdateProfileForm from './UpdateProfileForm';

describe('UpdateProfileForm component', () => {
  it('renders three button', () => {
    render(
      <Router>
        <UpdateProfileForm />
      </Router>
    );

    const buttonElement = screen.getAllByRole('button');
    expect(buttonElement).toHaveLength(4);
  });
});
