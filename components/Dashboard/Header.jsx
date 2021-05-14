import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
import useAuth from '../../context/AuthContext';
import withAuth from '../../hoc/withAuth';

const Header = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <S.Header>
      <S.Left>
        <h1>Overview</h1>
        <p>Hi Savo, Welcome back.</p>
      </S.Left>
      <S.Right>
        <SearchOutlined />
        <StyledUserPicture>
          <h2>{currentUser.email.slice(0, 1).toUpperCase()}</h2>
        </StyledUserPicture>
      </S.Right>
    </S.Header>
  );
};

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

S.Left = styled.div``;
S.Right = styled.div`
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
  background-color: ${({ theme }) => theme.colors.secondary};
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
