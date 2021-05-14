import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import withAuth from '../hoc/withAuth';
import S from '../styles/styledComponents';

const settings = () => {
  return (
    <S.Container>
      <Navigation />
    </S.Container>
  );
};

export default withAuth(settings);
