import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

const transactionRepository = new TransactionsRepository();
const createTransactionService = new CreateTransactionService(
  transactionRepository,
);

// const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionRepository.all();
    const balance = transactionRepository.getBalance();
    const responseOBJ = { transactions, balance };
    return response.json(responseOBJ);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, type, value } = request.body;
    const createdTransaction = createTransactionService.execute({
      title,
      value,
      type,
    });

    return response.json(createdTransaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
