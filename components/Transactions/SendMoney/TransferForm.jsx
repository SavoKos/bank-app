import Image from 'next/image';
import styled from 'styled-components';
import S from '../../../styles/styledComponents';

const TransferForm = ({ user }) => {
  console.log(user);
  let avatar = <h1>{user.email.slice(0, 1).toUpperCase()}</h1>;

  if (user.photoURL)
    avatar = (
      <Image height={100} width={100} src={user.photoURL} className="avatar" />
    );

  return (
    <S.Transfer>
      <div className="avatar">{avatar}</div>
      <h2>{user.displayName || 'Stranger'}</h2>
      <h4>{user.email || 'Email unknown'}</h4>
      <S.Form>
        <div className="amount">
          <label htmlFor="amount"> Amount</label>
          <input
            type="number"
            name="amount"
            className="input-amount"
            id="amount"
            required
          />
        </div>
        <S.BlueButton className="send">Send</S.BlueButton>
      </S.Form>
    </S.Transfer>
  );
};

// -------------------------------------------------- styling ----------------------------------------------
S.Transfer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .amount {
    margin-top: 50px;
  }

  .send {
    margin-top: 0px;
  }

  h2 {
    margin: 10px 0 0 0 !important;
  }

  .avatar {
    padding: 10px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.secondary};
    height: 100px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      color: #fff;
      margin: 0;
    }
  }
`;

export default TransferForm;
