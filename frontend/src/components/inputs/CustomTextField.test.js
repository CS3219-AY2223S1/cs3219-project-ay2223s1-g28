import { render, screen } from '@testing-library/react';

import CustomTextField from './CustomTextField';

describe('CustomTextField component', () => {
  it('renders correct label', () => {
    const label = "I am a text field label";
    render(<CustomTextField label={label}/>);

    const labelRendered = screen.getByLabelText(label);
    expect(labelRendered).toBeInTheDocument();
  });
});
