import express from 'express';
import categoriesController from '../controllers/categoriesController';

const categoriesApi = express.Router();

categoriesApi.get('/categories', categoriesController.getCategories);
categoriesApi.get('/categories/:id', categoriesController.getCategoryById);
categoriesApi.post('/categories', categoriesController.createCategory);
categoriesApi.put('/categories', categoriesController.editCategory);
categoriesApi.delete('/categories/:id', categoriesController.deleteCategory);

export default categoriesApi;
