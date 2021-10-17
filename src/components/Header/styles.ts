import styled from 'styled-components';

export const Container = styled.header`
  background: var(--blue);
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 2rem 1rem 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }

  button {
    font-size: 1rem;
    color: #ffffff;
    background: var(--blue-light);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;
    margin-top: 1.5rem;

    transition: filter 0.2s;

    @media only screen and (min-width: 768px) {
      margin-top: 0;
    }

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
