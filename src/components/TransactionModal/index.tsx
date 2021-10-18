import Modal from 'react-modal';
import { FormEvent, useEffect, useState } from 'react';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { useTransactions } from '../../hooks/useTransactions';
import { TransactionModel } from '../../models/Transaction';

interface TransactionModalProps {
  model?: TransactionModel;
  isOpen: boolean;
  onRequestClose: () => void;
}

export function TransactionModal({
  model,
  isOpen,
  onRequestClose,
}: TransactionModalProps) {
  const { createTransaction, updateTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('deposit');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (model) {
      setTitle(model.title);
      setAmount(model.amount);
      setType(model.type);
      setCategory(model.category);
    }
  }, [model]);

  function closeTransactionModal() {
    setTitle('');
    setAmount(0);
    setType('deposit');
    setCategory('');

    onRequestClose();
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (model) {
      await updateTransaction(model.id, { title, amount, type, category });
    } else {
      await createTransaction({ title, amount, type, category });
    }

    closeTransactionModal();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeTransactionModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={closeTransactionModal}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Close modal" />
      </button>

      <Container onSubmit={handleSubmit}>
        <h2>{model ? `Editing ${model.title}` : 'Add new transaction'}</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Income" />
            <span>Income</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => setType('withdrawal')}
            isActive={type === 'withdrawal'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Outcome" />
            <span>Outcome</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button type="submit">Save</button>
      </Container>
    </Modal>
  );
}
