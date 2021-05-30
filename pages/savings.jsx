import styled from 'styled-components';
import Navigation from '../components/Navigation';
import S from '../styles/styledComponents';

const savings = () => {
  return (
    <S.Container>
      <Navigation />
      <S.Savings></S.Savings>
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
`;
