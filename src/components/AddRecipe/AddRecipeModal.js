import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const RecipeFormModal = ({ isOpen, closeModal, addRecipe }) => {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: [],
    image: '',
    steps: [''], // Start with one empty step
    preparationTime: '',
    author: ''
  });
  const user = useSelector((state) => state.user);
  useEffect(() => {
    // Reset the form when the user changes
    setRecipe({
      title: '',
      ingredients: [],
      image: '',
      steps: [''],
      preparationTime: '',
      author: '', // Reset author field
    });
  }, [user]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      ...recipe,
      author: user?.id, // Attach user ID during form submission
    };
    addRecipe(newRecipe); // Pass the recipe data to the parent component
    setRecipe({
      title: '',
      ingredients: [],
      image: '',
      steps: [''],
      preparationTime: '',
      author: '' // Clear author after submission
    });
    closeModal(); // Close the modal after adding the recipe
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
  };

  const removeIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...recipe.steps];
    newSteps[index] = value;
    setRecipe({ ...recipe, steps: newSteps });
  };

  const addStep = () => {
    setRecipe({ ...recipe, steps: [...recipe.steps, ''] });
  };

  const removeStep = (index) => {
    const newSteps = recipe.steps.filter((_, i) => i !== index);
    setRecipe({ ...recipe, steps: newSteps });
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}
    >
      <div className="bg-white rounded-lg p-8 max-w-lg w-full max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add New Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={recipe.title}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Ingredients</label>
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center mb-2">
                <textarea
                  name="ingredients"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  className="w-full border rounded px-4 py-2 h-16 resize-y overflow-auto"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="ml-2 text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="text-blue-500"
            >
              Add Ingredient
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image URL</label>
            <input
              type="text"
              name="image"
              value={recipe.image}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Steps</label>
            {recipe.steps.map((step, index) => (
              <div key={index} className="flex items-center mb-2">
                <textarea
                  name="steps"
                  value={step}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  className="w-full border rounded px-4 py-2 h-16 resize-y overflow-auto"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeStep(index)}
                  className="ml-2 text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addStep}
              className="text-blue-500"
            >
              Add Step
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Preparation Time</label>
            <input
              type="text"
              name="preparationTime"
              value={recipe.preparationTime}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="mr-4 bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default RecipeFormModal;
