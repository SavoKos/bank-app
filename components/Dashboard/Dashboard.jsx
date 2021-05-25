import styled from 'styled-components';
import Header from './Header';
import Transactions from '../Transactions/Transactions';
import Transaction from '../Transactions/Transaction';
import Savings from './Savings/Savings';
import CardOptions from './CardOptions';
import { database } from '../../firebase';
import useAuth from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import Spinner from '../UI/Spinner';
import Router from 'next/router';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState(<Spinner />);
  const [cards, setCards] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    database
      .ref(`users/${currentUser.uid}`)
      .get()
      .then(res => {
        const fetchedUser = res.val();
        if (!fetchedUser.cards) return Router.push('/cardeditor');
        if (!fetchedUser.transactions)
          return setTransactions(<h2>No Transactions Found!</h2>);

        const transactionsList = [];
        for (const [key, value] of Object.entries(fetchedUser.transactions)) {
          if (filter === 'all' || value.type === filter)
            transactionsList.push(
              <Transaction transaction={[value]} key={key} />
            );
        }

        const cardsList = [];
        if (fetchedUser.cards)
          for (const [key, value] of Object.entries(fetchedUser.cards)) {
            cardsList.push(value);
          }

        setLoading(false);
        setCards(cardsList !== [] ? cardsList : null);
        setTransactions(
          transactionsList !== [] ? transactionsList : 'No Transactions Found'
        );
      })
      .catch(error => setTransactions('Something went wrong. Try again'));
  }, [filter]);

  if (loading) return <Spinner />;
  return (
    <S.Dashboard>
      <Header page="Dashboard" />
      <S.MainContent>
        <Transactions setFilter={setFilter} transactions={transactions} />
        <Savings />
        <CardOptions cards={cards} />
      </S.MainContent>
    </S.Dashboard>
  );
};
export default Dashboard;

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Dashboard = styled.div`
  background-color: #fff;
  width: 100%;
  border-radius: 30px 0 0 30px;
  padding: 40px 40px;
`;

S.MainContent = styled.main`
  display: flex;
  align-items: flex-start;

  & > * {
    width: 32%;
  }
`;
