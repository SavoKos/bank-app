import styled from 'styled-components';
import Transactions from './Transactions';
import Savings from './Savings/Savings';
import CardOptions from './CardOptions/CardOptions';

const Main = () => {
  return (
    <S.MainContent>
      <Transactions />
      <Savings />
      <CardOptions />
    </S.MainContent>
  );
};

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.MainContent = styled.main`
  display: flex;
  align-items: flex-start;

  & > * {
    width: 32%;
  }
`;

export default Main;
