import { useEffect } from 'react';
import styled from 'styled-components';
import Dashboard from '../components/Dashboard/Dashboard';
import Navigation from '../components/Navigation/Navigation';
import useAuth from '../context/AuthContext';
import withAuth from '../hoc/withAuth';

function Home() {
  const { currentUser } = useAuth();
  console.log('fetching user');
  console.log(currentUser);

  return (
    <StyledContainer>
      <Navigation />
      <Dashboard />
    </StyledContainer>
  );
}

export default withAuth(Home);

// -------------------------------------------------- styling ----------------------------------------------
const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 30px;
  display: flex;
  overflow: hidden;
`;

export { StyledContainer };
