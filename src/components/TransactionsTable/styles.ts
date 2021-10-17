import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 4rem;
  overflow-x: auto;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    tr {
      cursor: pointer;
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: var(--shape);
      color: var(--text-body);
      border-radius: 0.25rem;

      text-overflow: ellipsis;
      white-space: nowrap;

      &:first-child {
        color: var(--text-title);
      }

      &.deposit {
        color: var(--green);
      }

      &.withdrawal {
        color: var(--red);
      }

      img {
        display: flex;
        cursor: pointer;
      }
    }
  }
`;
