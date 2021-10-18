import { useTransactions } from '../../hooks/useTransactions';
import { TransactionModel } from '../../models/Transaction';

import deleteImg from '../../assets/delete.svg';

import { Container } from './styles';
import { FormEvent } from 'react';

interface TransactionsTableProps {
  onOpenTransactionModal: (transactionModel: TransactionModel) => void;
}

export function TransactionsTable({
  onOpenTransactionModal,
}: TransactionsTableProps) {
  const { transactions, deleteTransaction } = useTransactions();

  function handleDeleteTransaction(event: FormEvent, id: number) {
    event.stopPropagation();

    deleteTransaction(id);
  }

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Value</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            <tr
              key={transaction.id}
              onClick={() => onOpenTransactionModal(transaction)}
            >
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                }).format(new Date(transaction.createdAt))}
              </td>
              <td>
                <img
                  src={deleteImg}
                  alt="Delete transaction"
                  onClick={event =>
                    handleDeleteTransaction(event, transaction.id)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
