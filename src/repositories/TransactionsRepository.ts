import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = { income: 0, outcome: 0, total: 0 };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    this.updateBalance(type, value);

    return transaction;
  }

  private updateBalance(type: 'income' | 'outcome', value: number): void {
    if (type === 'outcome') {
      if (this.balance.total - value < 0) {
        throw Error(
          'Sorry! You do not have money for this transaction operation. You is a "pobre"',
        );
      }
      this.balance.outcome += value;
    } else {
      this.balance.income += value;
    }

    this.balance.total = this.balance.income - this.balance.outcome;
  }
}

export default TransactionsRepository;
