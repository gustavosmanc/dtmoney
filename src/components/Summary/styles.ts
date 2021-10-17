import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -10rem;
`;

interface AmountCardProps {
  isTotal?: boolean;
  totalIsNegative?: boolean;
}

export const AmountCard = styled.div<AmountCardProps>`
  background: ${({ isTotal, totalIsNegative }) => {
    if (isTotal) {
      return totalIsNegative ? 'var(--red)' : 'var(--green)';
    }

    return 'var(--shape)';
  }};

  padding: 1.5rem 2rem;
  border-radius: 0.25rem;
  color: ${({ isTotal }) => (isTotal ? '#ffffff' : 'var(--text-title)')};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
    font-weight: 500;
    line-height: 3rem;
  }
`;
