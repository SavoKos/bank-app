import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Dashboard from '../components/Dashboard/Dashboard';
import Navigation from '../components/Navigation/Navigation';
import AuthContext from '../context/AuthContext';
import Router from 'next/router';
import Spinner from '../components/UI/Spinner';

export default function Home() {
  const [auth, setAuth] = useContext(AuthContext);
  console.log(auth);

  useEffect(() => {
    if (!auth) Router.push('/auth');
  }, []);

  if (!auth) return <Spinner />;

  return (
    <StyledContainer>
      <Navigation />
      <Dashboard />
    </StyledContainer>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 30px;
  display: flex;
  overflow: hidden;
`;
