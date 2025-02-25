import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RegisterForm from '../src/components/auth/RegisterForm';

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  );
});

describe('RegisterForm', () => {
  test('renders RegisterForm component', () => {
    render(<RegisterForm setOpenLogin={jest.fn()} />);

    expect(screen.getByText(/Inscription/i)).toBeInTheDocument();
  });

  test('shows error message when fields are empty', () => {
    render(<RegisterForm setOpenLogin={jest.fn()} />);

    fireEvent.click(screen.getByText(/M'inscrire/i));
    expect(screen.getByText(/Le nom est obligatoire/i)).toBeInTheDocument();
  });

  test('calls handleSubmit on form submit', async () => {
    render(<RegisterForm setOpenLogin={jest.fn()} />);

    fireEvent.change(screen.getByLabelText('Nom'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Prénom'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Votre adresse e-mail'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText('Confirmer votre mot de passe'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText('Type d\'établissement'), { target: { value: '1' } });

    await act(async () => {
      fireEvent.click(screen.getByText(/M'inscrire/i));
    });

    expect(fetch).toHaveBeenCalled();
  });
});

