import styled from 'styled-components';
import Image from 'next/image';
import formatAmount from './FormatNumber';

const Transaction = props => {
  const transaction = Object.values(props.transaction)[0];
  console.log(transaction);

  const imageSrc = transaction.photoURL
    ? transaction.photoURL
    : '/navigationLogo.png';
  let avatar = (
    <Image
      src={imageSrc}
      height={35}
      width={35}
      layout="fixed"
      className="img"
    />
  );

  if (transaction.sender)
    avatar = (
      <S.Avatar>
        <h2>{transaction.sender.slice(0, 1)}</h2>
      </S.Avatar>
    );

  return (
    <S.Transaction>
      <div className="left">
        {avatar}
        <div className="info">
          <h4>
            {transaction.sender || transaction.recipient || transaction.name}
          </h4>
          <h5>{new Date(transaction.date).toLocaleDateString()}</h5>
        </div>
      </div>
      <div className="right">
        <h4>{formatAmount(transaction.amount)}</h4>
        <h5 className={transaction.type}>{transaction.type}</h5>
      </div>
    </S.Transaction>
  );
};

export default Transaction;

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Transaction = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 0 30px;

  h5 {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.secondary};

    &.income {
      color: green;
    }

    &.outcome {
      color: red;
    }
  }

  .left {
    display: flex;
    align-items: center;
    .img {
      border-radius: 50%;
    }

    .info {
      margin-left: 25px;
    }
  }
`;

S.Avatar = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 50%;
  height: 35px;
  width: 35px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;
