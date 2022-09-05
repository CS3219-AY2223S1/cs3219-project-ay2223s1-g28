import { render, screen } from '@testing-library/react';

import IconTextField from './IconTextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

describe('IconTextField component', () => {
  test('renders correct label', () => {
    const label = "I am a text field label";
    render(<IconTextField label={label}/>);

    const labelRendered = screen.getByLabelText(label);
    expect(labelRendered).toBeInTheDocument();
  });
});
