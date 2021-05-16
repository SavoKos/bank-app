import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
import useAuth from '../../context/AuthContext';
import withAuth from '../../hoc/withAuth';
import Link from 'next/link';

const Header = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  let welcomeMessage = (
    <p>
      Hi stranger, head to <Link href="/profile">profile options</Link> to
      change your name.
    </p>
  );
  if (currentUser.displayName)
    welcomeMessage = <p>Hi {currentUser.displayName}. Welcome back!</p>;

  return (
    <S.Header>
      <S.Left>
        <h1>Dashboard</h1>
        {welcomeMessage}
      </S.Left>
      <S.Right>
        <SearchOutlined />
        <Link href="/profile">
          <S.Avatar>
            <h2>{currentUser.email.slice(0, 1).toUpperCase()}</h2>
          </S.Avatar>
        </Link>
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

S.Left = styled.div`
  a {
    color: ${({ theme }) => theme.colors.blue};
  }
`;
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

S.Avatar = styled.div`
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