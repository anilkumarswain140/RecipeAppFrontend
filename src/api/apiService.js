import { BASE_URL } from '../utils/constants';
import axios from 'axios';

// Create the axios instance with the base URL
const api = axios.create({
    baseURL: BASE_URL,
});

// Add a request interceptor to dynamically set the Authorization header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // Get token from localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Add token to Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Function for user sign up
export const signUpUser = async (formData) => {
    try {
        const response = await api.post('auth/register', formData);
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
};

// Function for user login
export const login = async (formData) => {
    try {
        const response = await api.post('auth/login', formData);
        return response;
    } catch (error) {
        console.error('Error during login');
        throw error;
    }
}

// Function to get recipes
export const getRecipes = async (params = {}) => {
    try {
        // Construct the query string from the params object
        const queryString = new URLSearchParams(params).toString();
        const response = await api.get(`recipes?${queryString}`);

        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching Recipes:', error);
        throw error;
    }
};

// Function to create a new recipe
export const createRecipe = async (recipe) => {
    try {
        const response = await api.post('recipes', recipe);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error creating recipe:', error);
        throw error;
    }
};

// Function to get recipes
export const getRecipeDetails = async (recipeId) => {
    try {
        const response = await api.get(`recipes/recipe/${recipeId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching Recipes:', error);
        throw error;
    }
};

// Function to rate the Recipe
export const rateRecipe = async (recipeId, newRating, userId) =>{
    try{
        const payload = {
            value: newRating,
            user: {
                "_id": userId
            }
        }
        const response = await api.post(`recipes/${recipeId}/rate`,payload);
        return response;
    }catch(error){
        console.error("Something wrong");
        throw error;
    }
}

// Function to add Comment
export const addComment = async (recipeId, comment) =>{
    try{
        const payload = {
            content: comment,
            recipeId: recipeId,
        }
        const response = await api.post('comments',payload);
        return response;
    }catch(error){
        console.error("Something wrong");
        throw error;
    }
}