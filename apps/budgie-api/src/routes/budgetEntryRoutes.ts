import express from 'express';
import budgetEntryController from '../controllers/budgetEntryController';

const budgetEntryApi = express.Router();

budgetEntryApi.get('/budget-entries', budgetEntryController.getBudgetEntries);
budgetEntryApi.get(
  '/budget-entries/:id',
  budgetEntryController.getBudgetEntryById,
);
budgetEntryApi.post('/budget-entries', budgetEntryController.createBudgetEntry);
budgetEntryApi.put('/budget-entries', budgetEntryController.editBudgetEntry);
budgetEntryApi.delete(
  '/budget-entries/:id',
  budgetEntryController.deleteBudgetEntry,
);

export default budgetEntryApi;
