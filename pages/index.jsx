import S from '../styles/styledComponents';
import Dashboard from '../components/Dashboard/Dashboard';
import Navigation from '../components/Navigation';
import useAuth from '../context/AuthContext';
import withAuth from '../hoc/withAuth';
import Head from '../components/Head';

function Home() {
  return (
    <>
      <Head title="Dashboard" />
      <S.Container>
        <Navigation />
        <Dashboard />
      </S.Container>
    </>
  );
}

export default withAuth(Home);
