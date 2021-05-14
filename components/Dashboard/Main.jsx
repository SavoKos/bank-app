import styled from 'styled-components';
import Transactions from './Transactions';

const Main = () => {
  return (
    <S.MainContent>
      <Transactions />
    </S.MainContent>
  );
};

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.MainContent = styled.main`
  display: flex;
  align-items: center;

  & > * {
    width: 32%;
  }
`;

export default Main;
