import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
import Icon from '../UI/Icon';
import Transaction from './Transaction';
import { useEffect, useState } from 'react';
import useAuth from '../../context/AuthContext';
import Spinner from '../UI/Spinner';
import { database } from '../../firebase';

const Transactions = () => {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState(<Spinner />);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    database
      .ref(`users/${currentUser.uid}/transactions`)
      .get()
      .then(res => {
        if (!res.val()) return setTransactions(<h2>No Transactions Found!</h2>);
        const transactionsList = [];
        for (const [key, value] of Object.entries(res.val())) {
          if (filter === 'all' || value.type === filter)
            transactionsList.push(
              <Transaction transaction={[value]} key={key} />
            );
        }

        setTransactions(
          transactionsList !== [] ? transactionsList : 'No Transactions Found'
        );
      })
      .catch(error => setTransactions('Something went wrong. Try again'));
  }, [filter]);
  console.log(transactions);

  return (
    <S.Transactions>
      <S.Header>
        <h1>All Transactions</h1>
        <S.Icons>
          <SearchOutlined />
          <Icon type="icon-sort" style={{ fontsize: '18px' }} />
        </S.Icons>
      </S.Header>
      <form>
        <S.Radio onChange={e => setFilter(e.target.id)}>
          <input type="radio" id="all" name="transactions" defaultChecked />
          <label htmlFor="all">All</label>
          <input type="radio" id="income" name="transactions" />
          <label htmlFor="income">Income</label>
          <input type="radio" id="outcome" name="transactions" />
          <label htmlFor="outcome">Outcome</label>
        </S.Radio>
      </form>
      <S.TransactionsList>{transactions}</S.TransactionsList>
    </S.Transactions>
  );
};

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Transactions = styled.div`
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

S.Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
S.Icons = styled.div`
  & > * {
    font-size: 20px;
    margin: 0 10px;
    color: #000;
    cursor: pointer;
  }
`;

S.Radio = styled.div`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 3px;
  margin: 20px;
  border-radius: 30px;
  overflow: hidden;

  input[type='radio'] {
    position: absolute;
    visibility: hidden;
    display: none;

    &:checked + label {
      background-color: #fff;
      color: #000;
      box-shadow: 0px 10px 13px -5px rgba(0, 0, 0, 0.18);
    }
  }

  label {
    background-color: ${({ theme }) => theme.colors.primary};
    display: inline-block;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: bold;
    padding: 10px 40px;
    border-radius: 30px;
  }
`;

S.TransactionsList = styled.div`
  width: 100%;
  max-height: 600px;
  overflow: auto;

  h2 {
    text-align: center;
  }

  &::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }

  &::-webkit-scrollbar-track {
    border-radius: 20px; /* roundness of the scroll thumb */
    background: ${({ theme }) =>
      theme.colors.primary}; /* color of the tracking area */
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme.colors.lightBlue}; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
  }
`;

export default Transactions;
