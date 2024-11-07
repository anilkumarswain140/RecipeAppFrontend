// RecipeDetails.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RecipeDetails from './RecipeDetailsPage';
import { getRecipeDetails, rateRecipe } from '../../api/apiService';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useParams } from 'react-router-dom';

// Mocking the API calls
jest.mock('../../api/apiService', () => ({
  getRecipeDetails: jest.fn(),
  rateRecipe: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

const mockStore = configureStore();
const store = mockStore({
  user: { id: '123', username: 'testuser' }, // Mock user data
});

describe('RecipeDetails Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
    useParams.mockReturnValue({ id: '1' });
  });

  test('submits a rating', async () => {
    // Mock the API response for recipe details
    getRecipeDetails.mockResolvedValueOnce({
      title: 'Test Recipe',
      image: 'test-image.jpg',
      author: { username: 'Chef John' },
      preparationTime: 30,
      averageRating: 4.5,
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      steps: ['Step 1', 'Step 2'],
      comments: [],
    });

    render(
      <Provider store={store}>
        <RecipeDetails />
      </Provider>
    );

    // Wait for the component to render
    expect(await screen.findByText(/rate this recipe/i)).toBeInTheDocument();

    // Locate and click the star element for rating (ensure the correct data-testid in the component)
    const star = screen.getByTestId('star-2'); // Confirm that this data-testid is set in RecipeDetails
    fireEvent.click(star); // Simulate clicking the star to rate

    // Debugging log for recipeId
    const recipeId = useParams().id;
    console.log("Recipe ID used for rating:", recipeId); // Should print '1'

    // Wait and assert that rateRecipe is called with the expected parameters
    await waitFor(() => {
      expect(rateRecipe).toHaveBeenCalledTimes(1);
      expect(rateRecipe).toHaveBeenCalledWith('1', 2, '123'); // Ensure ID is '1' and rating is '2'
    });
});

});
