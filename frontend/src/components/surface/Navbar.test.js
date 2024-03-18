import { render, screen } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';

import NavBar from './NavBar';

describe('NavBar component', () => {
  it('renders "PeerPrep" text', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );

    const textElement = screen.getByText('PeerPrep');
    expect(textElement).toBeInTheDocument();
  });
});
