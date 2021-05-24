import styled from 'styled-components';
import Image from 'next/image';

const Transaction = props => {
  const transaction = Object.values(props.transaction)[0];
  console.log(transaction);
  const imageSrc = transaction.photoURL
    ? transaction.photoURL
    : '/navigationLogo.png';

  const formatAmount = () => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return formatter.format(transaction.amount);
  };

  return (
    <S.Transaction>
      <div className="left">
        <Image
          src={imageSrc}
          height={35}
          width={35}
          layout="fixed"
          className="img"
        />
        <div className="info">
          <h4>
            {transaction.sender || transaction.recipient || transaction.name}
          </h4>
          <h5>{new Date(transaction.date).toLocaleDateString()}</h5>
        </div>
      </div>
      <div className="right">
        <h4>{formatAmount()}</h4>
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
