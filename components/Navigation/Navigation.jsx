import styled from 'styled-components';
import Image from 'next/image';
import Icons from './Icons';
import { createFromIconfontCN } from '@ant-design/icons';
import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import Router from 'next/router';
import Modal from '../UI/Modal';

const Icon = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2539603_5l1bnzzxk5e.js', // icon-shoppingcart, icon-python
  ],
});

const Navigation = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [modalActive, setModalActive] = useState(false);

  const logoutHandler = () => {
    setAuth(false);
    Router.push('/auth');
  };

  return (
    <StyledNavigation>
      <Image src="/avatar.jpg" height={50} width={50} className="avatar" />
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
        <h1>Hi</h1>
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

  .avatar {
    justify-content: flex-start;
    border-radius: 50%;
    cursor: pointer;
    margin-bottom: 50px !important;
    height: 50px !important;
    width: 50px !important;
    min-height: 0 !important;
    position: static !important;
  }
`;

export default Navigation;
