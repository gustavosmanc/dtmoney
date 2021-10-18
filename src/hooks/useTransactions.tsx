import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  updateTransaction: (
    id: number,
    transaction: TransactionInput,
  ) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData,
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get('transactions')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  async function updateTransaction(
    id: number,
    transactionInput: TransactionInput,
  ) {
    const response = await api.put(`/transactions/${id}`, {
      ...transactionInput,
      updatedAt: new Date(),
    });

    const { data: updatedTransaction } = response;

    setTransactions([
      ...transactions.filter(
        transaction => transaction.id !== updatedTransaction.id,
      ),
      updatedTransaction,
    ]);
  }

  async function deleteTransaction(id: number) {
    await api.delete(`/transactions/${id}`);

    setTransactions(transactions.filter(transaction => transaction.id !== id));
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
