import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  /**
 * {
  "id": "uuid",
  "title": "Salário",
  "value": 3000,
  "type": "income"
}
 */
  public execute({ title, value, type }: TransactionDTO): Transaction {
    //  const transaction = new Transaction(title, value, type);

    const transactionCreated = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transactionCreated;
  }
}

export default CreateTransactionService;
