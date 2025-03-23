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
import configureStore from 'redux-mock-store';
import ProductCard from '../src/components/dashboard/shop/ProductCard';
import { setCart } from '../src/stores/slices/cartSlice';

const mockStore = configureStore([]);
const store = mockStore({
  cart: {
    cart: [],
  },
});

describe('ProductCard', () => {
  const product = {
    id: 1,
    name: 'Test Product',
    description: 'This is a test product',
    price: 10,
    image: '/test-image.jpg',
  };

  beforeEach(() => {
    store.clearActions();
  });

  test('renders ProductCard component', () => {
    render(
      <Provider store={store}>
        <ProductCard product={product} />
      </Provider>
    );

    expect(screen.getAllByText(/Test Product/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/This is a test product/i)).toBeInTheDocument();
    expect(screen.getByText(/10 €/i)).toBeInTheDocument();
  });

  test('adds product to cart when "Ajouter" button is clicked', async () => {
    render(
      <Provider store={store}>
        <ProductCard product={product} />
      </Provider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText(/Ajouter/i));
    });

    const actions = store.getActions();
    expect(actions).toContainEqual(setCart({ cart: [{ ...product, quantity: 1 }] }));
  });
});
