import express from 'express';
import accountsController from '../controllers/accountsController';

const accountsApi = express.Router();

accountsApi.get('/accounts', accountsController.getAccounts);
accountsApi.get('/accounts/:id', accountsController.getAccountById);
accountsApi.post('/accounts', accountsController.createAccount);
accountsApi.put('/accounts', accountsController.editAccount);
accountsApi.delete('/accounts/:id', accountsController.deleteAccount);

export default accountsApi;
