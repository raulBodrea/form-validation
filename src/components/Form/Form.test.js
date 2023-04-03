import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Form from './Form';

describe('Form', () => {
  it('renders the page title', () => {
    render(<Form />);

    const title = screen.queryByText('Un formular generic');
    expect(title).toBeInTheDocument();
  });

  it('invalidates names with less than 5 chars', async () => {
    const user = userEvent.setup();
    render(<Form />);

    const nameField = screen.queryByLabelText('Nume');
    await user.type(nameField, 'asdf');

    let error = screen.queryByText(
      'Numele trebuie sa aiba mai mult de 5 de caractere'
    );
    expect(error).toBeInTheDocument();

    await user.type(nameField, 'a');
    error = screen.queryByText(
      'Numele trebuie sa aiba mai mult de 5 de caractere'
    );
    expect(error).not.toBeInTheDocument();
  });

  it('does not allow names of more than 20 chars', async () => {
    const user = userEvent.setup();
    render(<Form />);
    const inputField = screen.queryByLabelText('Nume');

    await user.type(inputField, 'asdfghjklasdfghjklas');
    let error = screen.queryByText(
      'Numele trebuie sa aiba mai putin de 20 de caractere'
    );
    expect(error).not.toBeInTheDocument();

    await user.type(inputField, 'a');
    error = screen.queryByText(
      'Numele trebuie sa aiba mai putin de 20 de caractere'
    );
    expect(error).toBeInTheDocument();
  });

  it('invalidates input with two consecutive spaces', async () => {
    const user = userEvent.setup();
    render(<Form />);
    const inputField = screen.queryByLabelText('Nume');

    await user.type(inputField, 'kksk  jhf');
    const error = screen.queryByText('Numele nu este valid');
    expect(error).toBeInTheDocument();
  });

  it.each([[0], [1], [2], [3], [4], [5], [6], [7], [8], [9]])(
    'should invalidate names that include numbers',
    async invalidChar => {
      const user = userEvent.setup();
      render(<Form />);
      const inputField = screen.queryByLabelText('Nume');

      await user.type(inputField, `asdfg ${invalidChar}`);
      const error = screen.queryByText('Numele nu este valid');
      expect(error).toBeInTheDocument();
    }
  );
});
