import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import useAuth from '../../../context/AuthContext';
import { database } from '../../../firebase';
import S from '../../../styles/styledComponents';
import { v4 as uuid } from 'uuid';

const TransferForm = ({ recipient }) => {
  const [amount, setAmount] = useState(1);
  const { currentUser } = useAuth();
  const transactionID = uuid();

  console.log(recipient, currentUser);
  const transferHandler = e => {
    e.preventDefault();

    database
      .ref(`users/${currentUser.uid}/transactions/${transactionID}`)
      .set({
        type: 'outcome',
        amount: amount,
        name: 'Transfer',
        recipient: recipient.name,
        date: new Date().toISOString(),
        photoURL: recipient.photoURL || null,
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    database
      .ref(`users/${recipient.id}/transactions/${transactionID}`)
      .set({
        type: 'income',
        amount: amount,
        name: 'Transfer',
        sender: currentUser.displayName,
        date: new Date().toISOString(),
        photoURL: currentUser.photoURL,
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  let avatar = <h1>{recipient.name.slice(0, 1).toUpperCase()}</h1>;

  if (recipient.photoURL)
    avatar = (
      <Image
        height={100}
        width={100}
        src={recipient.photoURL}
        className="img"
      />
    );
  console.log(amount);
  return (
    <S.Transfer>
      <S.Avatar>{avatar}</S.Avatar>
      <h2>{recipient.name || 'Stranger'}</h2>
      <h4>{recipient.email || 'Email unknown'}</h4>
      <S.Form onSubmit={transferHandler}>
        <div className="amount">
          <label htmlFor="amount"> Amount</label>
          <input
            type="number"
            min="1"
            name="amount"
            className="input-amount"
            id="amount"
            onChange={e => setAmount(+e.target.value)}
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
`;

S.Avatar = styled.div`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.secondary};
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  .img {
    border-radius: 50%;
  }

  h1 {
    color: #fff;
    margin: 0;
  }
`;

export default TransferForm;
