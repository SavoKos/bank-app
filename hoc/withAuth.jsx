import Router from 'next/router';
import { useEffect } from 'react';
import Spinner from '../components/UI/Spinner';
import useAuth from '../context/AuthContext';

const withAuth = Component => {
  const Auth = props => {
    const { currentUser } = useAuth();

    useEffect(() => {
      if (!currentUser) Router.push('/auth');
    }, []);

    if (!currentUser) return <Spinner />;

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
