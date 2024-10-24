import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRecipes, createRecipe } from '../../api/apiService'; // Import your API service functions

// Fetch recipes from the API
export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async (search) => {
    const response = await getRecipes(search); // Fetch the list of recipes
    return response; // Assuming it returns an array of recipes
});

// Add a new recipe to the API
export const addRecipe = createAsyncThunk('recipes/addRecipe', async (newRecipe) => {
    await createRecipe(newRecipe); // Call your API function to add the recipe
    return newRecipe; // Return the new recipe (this can also be adjusted based on your API response)
});

const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
        loading: false,
        error: null,
        currentPage: 0,
        totalPages: 0
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.loading = false;
                state.recipes = action.payload.recipes; // Update recipes state
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchRecipes.rejected, (state) => {
                state.loading = false;
                state.error = 'Failed to fetch recipes';
            })
            .addCase(addRecipe.pending, (state) => {
                state.loading = true;
            })
            .addCase(addRecipe.fulfilled, (state) => {
                state.loading = false;
                // No need to push to state here; we will refresh recipes after adding
            })
            .addCase(addRecipe.rejected, (state) => {
                state.loading = false;
                state.error = 'Failed to add recipe';
            })
            
    },
});

export default recipeSlice.reducer;
