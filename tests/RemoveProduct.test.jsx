import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this to use toBeInTheDocument
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RemoveProduct from '../src/components/dashboard/shop/cart/RemoveProduct';
import { setCart } from '../src/stores/slices/cartSlice';

const mockStore = configureStore([]);
const initialState = {
  cart: { cart: [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }] },
};
const store = mockStore(initialState);

describe('RemoveProduct', () => {
  test('renders RemoveProduct component', () => {
    render(
      <Provider store={store}>
        <RemoveProduct productId={1} />
      </Provider>
    );

    expect(screen.getByRole('button', { name: /remove product/i })).toBeInTheDocument();
  });

  test('removes product from cart', () => {
    render(
      <Provider store={store}>
        <RemoveProduct productId={1} />
      </Provider>
    );

    const button = screen.getByRole('button', { name: /remove product/i });
    fireEvent.click(button);

    const actions = store.getActions();
    expect(actions).toContainEqual(setCart({ cart: [{ id: 2, name: 'Product 2' }] }));
  });
});
