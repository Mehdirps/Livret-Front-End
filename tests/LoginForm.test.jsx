/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import LoginForm from '../src/components/auth/LoginForm';

const mockStore = configureStore([]);
const store = mockStore({});

beforeAll(() => {
  global.alert = jest.fn();
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  );
});

describe('LoginForm', () => {
  test('renders LoginForm component', () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginForm setOpenLogin={jest.fn()} />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Connexion/i)).toBeInTheDocument();
  });

  test('shows error message when fields are empty', () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginForm setOpenLogin={jest.fn()} />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Me connecter/i));
    expect(window.alert).toHaveBeenCalledWith('Veuillez remplir tous les champs');
  });

  test('calls handleSubmit on form submit', async () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginForm setOpenLogin={jest.fn()} />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Votre adresse e-mail/i), { target: { value: 'mehdi.raposo77@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), { target: { value: 'mehdi.raposo77@gmail.com' } });

    await act(async () => {
      fireEvent.click(screen.getByText(/Me connecter/i));
    });

    expect(fetch).toHaveBeenCalled();
  });
});
