import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SupportContact from '../src/components/dashboard/SupportContact';
import { setError, setSuccess } from '../src/stores/slices/livretSlice';

const mockStore = configureStore([]);
const store = mockStore({
    user: { token: 'test-token' },
});

describe('SupportContact', () => {
    beforeEach(() => {
        store.clearActions();
    });

    test('renders SupportContact component', () => {
        render(
            <Provider store={store}>
                <SupportContact />
            </Provider>
        );

        expect(screen.getByRole('button', { name: /Contacter le support/i })).toBeInTheDocument();
    });

    test('submits the form successfully', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ message: 'Message envoyé avec succès !' }),
            })
        );

        render(
            <Provider store={store}>
                <SupportContact />
            </Provider>
        );

        fireEvent.click(screen.getByRole('button', { name: /Contacter le support/i }));

        await waitFor(() => {
            expect(screen.getByTestId('support-contact-modal')).toBeVisible();
        });

        fireEvent.change(screen.getByLabelText(/Sujet/i), { target: { value: 'technical' } });
        fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Test message' } });
        fireEvent.click(screen.getByLabelText(/J'accepte les conditions RGPD/i));

        fireEvent.submit(screen.getByText(/Envoyer/i));

        await waitFor(() => {
            const actions = store.getActions();
            expect(actions).toContainEqual(setSuccess({ success: 'Message envoyé avec succès !' }));
        });

        global.fetch.mockRestore();
    });

    test('handles form submission error', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ error: 'Erreur lors de l\'envoi du message' }),
            })
        );

        render(
            <Provider store={store}>
                <SupportContact />
            </Provider>
        );

        fireEvent.click(screen.getByRole('button', { name: /Contacter le support/i }));

        await waitFor(() => {
            expect(screen.getByTestId('support-contact-modal')).toBeVisible();
        });

        fireEvent.change(screen.getByLabelText(/Sujet/i), { target: { value: 'technical' } });
        fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Test message' } });
        fireEvent.click(screen.getByLabelText(/J'accepte les conditions RGPD/i));

        fireEvent.submit(screen.getByText(/Envoyer/i));

        await waitFor(() => {
            const actions = store.getActions();
            expect(actions).toContainEqual(setError({ error: 'Erreur lors de l\'envoi du message' }));
        });

        global.fetch.mockRestore();
    });
});