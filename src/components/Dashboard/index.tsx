import { TransactionModel } from '../../models/Transaction';
import { Summary } from '../Summary';
import { TransactionsTable } from '../TransactionsTable';
import { Container } from './styles';

interface DashboardProps {
  onOpenTransactionModal: (transactionModel: TransactionModel) => void;
}

export function Dashboard({ onOpenTransactionModal }: DashboardProps) {
  return (
    <Container>
      <Summary />
      <TransactionsTable
        onOpenTransactionModal={transactionModel =>
          onOpenTransactionModal(transactionModel)
        }
      />
    </Container>
  );
}
