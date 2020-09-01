import { getCustomRepository } from 'typeorm';
import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionRepository.find();
  const balance = await transactionRepository.getBalance();

  return response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    title,
    value,
    type,
    category,
  });

  const responseTransaction = {
    id: transaction.id,
    title: transaction.title,
    type: transaction.type,
    value: transaction.value,
    category: transaction.category.title,
  };

  return response.json(responseTransaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTransaction = new DeleteTransactionService();

  deleteTransaction.execute(id);

  response.status(204).json();
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
