import styled from 'styled-components';
import Image from 'next/image';
import S from '../../../styles/styledComponents';

const UserCard = ({ userData, clicked }) => {
  console.log(userData);
  let avatar = 'User';

  if (userData && userData.name)
    <h2 className="avatar">{userData.email.slice(0, 1).toUpperCase()}</h2>;

  if (userData.photoURL)
    avatar = (
      <Image
        height={50}
        width={50}
        src={userData.photoURL}
        className="card-image"
      />
    );
  return (
    <S.UserCard>
      <S.CardAvatar>{avatar}</S.CardAvatar>
      <div className="info">
        <h4>Name: {userData.name || 'Stranger'}</h4>
        <h5>Email: {userData.email || 'unknown'}</h5>
      </div>
      <S.BlueButton className="select" onClick={clicked}>
        Select
      </S.BlueButton>
    </S.UserCard>
  );
};

// -------------------------------------------------- styling ----------------------------------------------
S.UserCard = styled.div`
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 3px 0;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 10px 20px;

  .info {
    padding-left: 10px;
    > * {
      font-weight: 500;
    }
  }

  .select {
    padding: 8px 28px;
    font-size: 11px;
    margin-top: 0;
  }
`;

S.CardAvatar = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;

  .card-image {
    border-radius: 50%;
    margin: 0;
  }

  h2 {
    color: #fff;
    margin: 0 !important;
  }
`;

export default UserCard;
