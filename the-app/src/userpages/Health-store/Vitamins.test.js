import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProductsContext } from './context';
import Vitamins from './Vitamins';

describe('Vitamins component', () => {
  test('renders product list with sort dropdown', () => {
    // Arrange
    const mockProducts = [
      { id: 1, name: 'Product 1', price: 10, image: 'product1.jpg' },
      { id: 2, name: 'Product 2', price: 20, image: 'product2.jpg' },
      { id: 3, name: 'Product 3', price: 30, image: 'product3.jpg' },
      { id: 4, name: 'Product 4', price: 40, image: 'product4.jpg' },
    ];

    render(
      <MemoryRouter>
        <ProductsContext.Provider value={{ products: mockProducts }}>
          <Vitamins />
        </ProductsContext.Provider>
      </MemoryRouter>
    );

    // Act
    const sortDropdown = screen.getByRole('button', { name: /sort by:/i });
    const productElements = screen.getAllByRole('listitem');

    // Assert
    expect(sortDropdown).toBeInTheDocument();
    expect(productElements.length).toBe(mockProducts.length);
  });

  // Add more test cases for sorting and other functionality if needed
});
