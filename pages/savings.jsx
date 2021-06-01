import styled from 'styled-components';
import Navigation from '../components/Navigation';
import S from '../styles/styledComponents';
import SavingsItem from '../components/Savings/SavingsItem';
import { useEffect, useState } from 'react';
import { database } from '../firebase';
import useAuth from '../context/AuthContext';
import Spinner from '../components/UI/Spinner';
import Header from '../components/Dashboard/Header';

const savings = () => {
  const [investment, setInvestment] = useState(null);
  const [deposit, setDeposit] = useState(null);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    database
      .ref(`users/${currentUser.uid}`)
      .get()
      .then(snap => {
        const data = snap.val();
        if (data.investment) setInvestment(data.investment);
        if (data.deposit) setDeposit(data.deposit);
        setLoading(false);
        console.log(snap.val());
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;

  return (
    <S.Container>
      <Navigation />
      <S.Savings>
        <Header page="Savings" />
        <div className="cards">
          <SavingsItem savingsData={deposit} type="deposit" />
          <SavingsItem savingsData={investment} type="investment" />
        </div>
      </S.Savings>
    </S.Container>
  );
};

export default savings;

// -------------------------------------------------- styling ----------------------------------------------
S.Savings = styled.div`
  background-color: #fff;
  width: 100%;
  border-radius: 30px 0 0 30px;
  padding: 40px 40px;

  .cards {
    display: flex;

    > div {
      margin: 0 40px;
    }
  }
`;
