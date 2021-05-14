import styled from 'styled-components';
import Header from './Header';
import Main from './Main';

const S = {};
const Dashboard = () => {
  return (
    <S.Dashboard>
      <Header />
      <Main />
    </S.Dashboard>
  );
};

S.Dashboard = styled.div`
  background-color: #fff;
  width: 100%;
  border-radius: 30px 0 0 30px;
  padding: 40px 40px;
`;

export default Dashboard;
