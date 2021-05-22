import styled from 'styled-components';
import Header from '../components/Dashboard/Header';
import Transactions from '../components/Transactions/Transactions';
import Navigation from '../components/Navigation';
import S from '../styles/styledComponents';

const transactions = () => {
  return (
    <S.Container>
      <Navigation />
      <S.Main>
        <Header page="Transactions" />
        <S.Content>
          <Transactions />
          {/* <SendMoney />
          <Loans /> */}
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
