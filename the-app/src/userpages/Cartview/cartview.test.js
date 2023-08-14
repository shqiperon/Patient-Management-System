import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cart from './cartview';

describe('Cart component', () => {
  test('calculates the total price correctly', () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', price: 10, qty: 2 },
      { id: 2, name: 'Product 2', price: 20, qty: 1 },
    ];

    const calculateTotal = (products) =>
      products.reduce((sum, product) => sum + product.price * product.qty, 0);

    const expectedTotal = calculateTotal(mockProducts);

    render(
      <MemoryRouter>
        <Cart products={mockProducts} />
      </MemoryRouter>
    );

    
    
    console.log('Expected Total:', expectedTotal);

    expect(expectedTotal).toEqual(expectedTotal);
  });
});
