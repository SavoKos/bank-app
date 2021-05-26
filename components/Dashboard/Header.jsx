import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
import useAuth from '../../context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { memo } from 'react';

const Header = memo(({ page = 'Excellence Holdings' }) => {
  const { currentUser } = useAuth();

  console.log(currentUser);
  let welcomeMessage = (
    <p>
      Hi stranger, head to <Link href="/profile">profile options</Link> to
      change your name.
    </p>
  );
  if (currentUser?.displayName)
    welcomeMessage = <p>Hi {currentUser.displayName}. Welcome back!</p>;

  let avatar = 'User';

  if (currentUser?.email)
    avatar = <h2>{currentUser.displayName.slice(0, 1).toUpperCase()}</h2>;

  if (currentUser?.photoURL)
    avatar = (
      <Image
        height={50}
        width={50}
        src={currentUser.photoURL}
        className="avatar"
      />
    );

  return (
    <S.Header>
      <S.Left>
        <h1>{page}</h1>
        {welcomeMessage}
      </S.Left>
      <S.Right>
        <SearchOutlined />
        <Link href="/profile">
          <S.Avatar>{avatar}</S.Avatar>
        </Link>
      </S.Right>
    </S.Header>
  );
});

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
