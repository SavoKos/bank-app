import styled from 'styled-components';
import { StyledContainer } from '.';
import Navigation from '../components/Navigation/Navigation';
import withAuth from '../hoc/withAuth';

const settings = () => {
  return (
    <StyledContainer>
      <Navigation />
    </StyledContainer>
  );
};

export default withAuth(settings);
