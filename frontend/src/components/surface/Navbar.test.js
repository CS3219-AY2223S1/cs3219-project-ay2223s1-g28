import { render, screen } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './Navbar';

describe('Navbar component', () => {
  it('renders "PeerPrep" text', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const textElement = screen.getByText('PeerPrep');
    expect(textElement).toBeInTheDocument();
  });
});
