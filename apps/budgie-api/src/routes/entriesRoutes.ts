import express from 'express';
import entriesController from '../controllers/entriesController';

const entriesApi = express.Router();

entriesApi.get('/entries', entriesController.getEntries);
entriesApi.get('/entries/:id', entriesController.getEntryById);
entriesApi.post('/entries', entriesController.createEntry);
entriesApi.put('/entries', entriesController.editEntry);
entriesApi.delete('/entries/:id', entriesController.deleteEntry);

export default entriesApi;
