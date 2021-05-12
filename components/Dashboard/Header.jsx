import styled from 'styled-components';
import Image from 'next/image';
import { SearchOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Header = () => {
  const [auth, setAuth] = useContext(AuthContext);
  return (
    <StyledHeader>
      <StyledLeft>
        <h1>Overview</h1>
        <p>Hi {auth.displayName}, Welcome back.</p>
      </StyledLeft>
      <StyledRight>
        <SearchOutlined />
        <StyledUserPicture>
          <h2>{auth.displayName.slice(0, 1)}</h2>
        </StyledUserPicture>
      </StyledRight>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const StyledLeft = styled.div``;
const StyledRight = styled.div`
  display: flex;
  align-items: center;
  .avatar {
    border-radius: 50%;
    cursor: pointer;
  }

  .anticon {
    margin-right: 40px;
    cursor: pointer;
    font-size: 20px;
    box-shadow: 0 5px 13px -2px rgb(0 0 0 / 21%);
    border-radius: 50%;
    padding: 10px;
  }
`;

const StyledUserPicture = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #2028eb;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 5px 13px -2px rgb(0 0 0 / 21%);

  h2 {
    color: #fff;
  }
`;

export default Header;
