import { getCustomRepository } from 'typeorm';
import TransactionRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionRepository);

    const checkTransactionExists = await transactionRepository.findOne(id);

    if (!checkTransactionExists) {
      throw new AppError('Transaction not exists');
    }

    await transactionRepository.delete(id);
  }
}

export default DeleteTransactionService;
