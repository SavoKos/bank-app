import styled from 'styled-components';
import Transactions from './Transactions';

const Main = () => {
  return (
    <StyledMainContent>
      <Transactions />
    </StyledMainContent>
  );
};

const StyledMainContent = styled.main`
  display: flex;
  align-items: center;

  & > * {
    width: 32%;
  }
`;

export default Main;
