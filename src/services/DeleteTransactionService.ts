import { getCustomRepository } from 'typeorm';
import TransactionRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(transaction_id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionRepository);

    await transactionRepository.delete(transaction_id);
  }
}

export default DeleteTransactionService;
