import { useState } from 'react';
import Modal from 'react-modal';

import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { TransactionModal } from './components/TransactionModal';

import { TransactionsProvider } from './hooks/useTransactions';
import { TransactionModel } from './models/Transaction';

import { GlobalStyle } from './styles/global';

Modal.setAppElement('#root');

export function App() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [transactionModel, setTransactionModel] = useState<
    TransactionModel | undefined
  >(undefined);

  function handleOpenTransactionModal(transactionModel?: TransactionModel) {
    if (transactionModel) {
      setTransactionModel(transactionModel);
    }

    setIsTransactionModalOpen(true);
  }

  function handleCloseTransactionModal() {
    setIsTransactionModalOpen(false);

    if (transactionModel) {
      setTransactionModel(undefined);
    }
  }

  return (
    <TransactionsProvider>
      <Header onOpenTransactionModal={handleOpenTransactionModal} />

      <Dashboard onOpenTransactionModal={handleOpenTransactionModal} />

      <TransactionModal
        isOpen={isTransactionModalOpen}
        onRequestClose={handleCloseTransactionModal}
        model={transactionModel}
      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}
