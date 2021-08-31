import styled from 'styled-components';
import Header from './Header';
import Transactions from '../Transactions/Transactions';
import Transaction from '../Transactions/Transaction';
import CardOptions from './CardOptions';
import { database } from '../../firebase';
import useAuth from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import Spinner from '../UI/Spinner';
import Router from 'next/router';
import SavingsItem from '../SavingsItem';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState(
    <Spinner absolute={false} />
  );
  const [cards, setCards] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [investment, setInvestment] = useState(null);
  const [deposit, setDeposit] = useState(null);

  useEffect(() => {
    database
      .ref(`users/${currentUser.uid}`)
      .get()
      .then((res) => {
        setLoading(false);
        const fetchedUser = res.val();
        if (!fetchedUser.cards) return Router.push('/cardeditor');

        const cardsList = [];
        if (fetchedUser.cards)
          for (const [key, value] of Object.entries(fetchedUser.cards)) {
            cardsList.push(value);
          }

        setCards(cardsList !== [] ? cardsList : null);

        if (fetchedUser.investment) setInvestment(fetchedUser.investment);
        if (fetchedUser.deposit) setDeposit(fetchedUser.deposit);

        if (!fetchedUser.transactions)
          return setTransactions(<h2>No Transactions Found!</h2>);

        const transactionsList = [];
        for (const [key, value] of Object.entries(fetchedUser.transactions)) {
          if (filter === 'all' || value.type === filter)
            transactionsList.push(
              <Transaction transaction={[value]} key={key} />
            );
        }

        setTransactions(
          transactionsList !== [] ? transactionsList : 'No Transactions Found'
        );
      })
      .catch((error) => setTransactions('Something went wrong. Try again'));
  }, [filter]);

  if (loading) return <Spinner />;
  return (
    <S.Dashboard>
      <Header page='Dashboard' />
      <S.MainContent>
        <Transactions setFilter={setFilter} transactions={transactions} />
        <S.Savings>
          <h1>Savings</h1>
          <SavingsItem type='deposit' savingsData={deposit} />
          <SavingsItem type='investment' savingsData={investment} />
        </S.Savings>
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

  @media (max-width: 576px) {
    width: 90%;
  }
`;

S.MainContent = styled.main`
  display: flex;
  align-items: flex-start;

  & > * {
    width: 32%;
  }

  @media (max-width: 1200px) {
    flex-direction: column;
    & > * {
      border-right: 0;
      width: 100%;
      margin-bottom: 100px;
    }
  }
`;

S.Savings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 40px;

  @media (max-width: 1200px) {
    margin: unset;
    margin-bottom: 100px;
  }
`;
