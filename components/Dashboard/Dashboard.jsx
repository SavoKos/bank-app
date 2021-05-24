import styled from 'styled-components';
import Header from './Header';
import Transactions from '../Transactions/Transactions';
import Savings from './Savings/Savings';
import CardOptions from './CardOptions';

const Dashboard = () => {
  return (
    <S.Dashboard>
      <Header page="Dashboard" />
      <S.MainContent>
        <Transactions />
        <Savings />
        <CardOptions />
      </S.MainContent>
    </S.Dashboard>
  );
};

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

export default Dashboard;
