import express from 'express';
import entryController from '../controllers/entryController';

const entryApi = express.Router();

entryApi.get('/entries', entryController.getEntries);
entryApi.get('/entries/:id', entryController.getEntryById);
entryApi.post('/entries', entryController.createEntry);
entryApi.put('/entries', entryController.editEntry);
entryApi.delete('/entries/:id', entryController.deleteEntry);

export default entryApi;
