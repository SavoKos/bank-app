import styled from 'styled-components';
import Header from '../components/Dashboard/Header';
import Navigation from '../components/Navigation';
import Loan from '../components/Transactions/Loan/LoanList';
import SendMoney from '../components/Transactions/Transfer/Transfer';
import Transactions from '../components/Transactions/Transactions';
import S from '../styles/styledComponents';
import { useEffect, useState } from 'react';
import Spinner from '../components/UI/Spinner';
import { database } from '../firebase';
import useAuth from '../context/AuthContext';
import Router from 'next/router';
import Transaction from '../components/Transactions/Transaction';

const transactions = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState(
    <Spinner absolute={false} />
  );
  const [filter, setFilter] = useState('all');
  const { currentUser } = useAuth();

  useEffect(() => {
    database
      .ref(`users/${currentUser.uid}`)
      .get()
      .then(res => {
        setLoading(false);
        const fetchedUser = res.val();
        if (!fetchedUser.cards) return Router.push('/cardeditor');

        if (!fetchedUser.transactions)
          return setTransactions(<h2>No Transactions Found!</h2>);

        const transactionsList = [];
        console.log(Object.keys(fetchedUser.transactions));
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
      .catch(error => {
        console.log(error);
        setLoading(false);
        setTransactions('Something went wrong. Try again');
      });
  }, [filter]);

  if (loading) return <Spinner />;
  return (
    <S.Container>
      <Navigation />
      <S.Main>
        <Header page="Transactions" />
        <S.Content>
          <Transactions transactions={transactions} setFilter={setFilter} />
          <SendMoney />
          <Loan />
        </S.Content>
      </S.Main>
    </S.Container>
  );
};

// -------------------------------------------------- styling ----------------------------------------------
S.Main = styled.main`
  background-color: #fff;
  width: 100%;
  border-radius: 30px 0 0 30px;
  padding: 40px 40px;
`;

S.Content = styled.div`
  display: flex;
  align-items: flex-start;

  & > * {
    width: 32%;
  }
`;

export default transactions;
