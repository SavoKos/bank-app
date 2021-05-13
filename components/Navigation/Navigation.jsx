import styled from 'styled-components';
import Image from 'next/image';
import Icons from './Icons';
import { createFromIconfontCN } from '@ant-design/icons';
import { useState } from 'react';
import Router from 'next/router';
import Modal from '../UI/Modal';
import useAuth from '../../context/AuthContext';
import Spinner from '../UI/Spinner';

const Icon = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2539603_5l1bnzzxk5e.js', // icon-shoppingcart, icon-python
  ],
});

const Navigation = () => {
  const { logout } = useAuth();
  const [modalActive, setModalActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const logoutHandler = () => {
    setLoading(true);
    logout()
      .then(res => {
        console.log(res);
        Router.push('/auth');
      })
      .catch(error => alert(error.message));
  };

  if (loading) return <Spinner />;

  return (
    <StyledNavigation>
      <Image
        src="/navigationLogo.png"
        height={70}
        width={50}
        className="logo"
      />
      <Icons />
      <Icon
        type="icon-logout"
        onClick={() => setModalActive(true)}
        style={{
          fontSize: '25px',
          color: '#7c8ea4',
          cursor: 'pointer',
          margin: '50px 0',
        }}
      />
      <Modal active={modalActive} closeModal={() => setModalActive(false)}>
        <button onClick={logoutHandler}>Logout</button>
      </Modal>
    </StyledNavigation>
  );
};

const StyledNavigation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0 30px;

  .logo {
    cursor: pointer;
    margin-bottom: 50px !important;
    height: 70px !important;
    width: 50px !important;
    min-height: 0 !important;
    position: static !important;
  }
`;

export default Navigation;
