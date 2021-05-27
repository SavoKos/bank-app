import styled from 'styled-components';
import Icon from './Icon';
import useAuth from '../../context/AuthContext';
import Router from 'next/router';
import formatAmount from '../Transactions/FormatNumber';

const Card = ({
  isEditing = false,
  className,
  number,
  provider,
  amount,
  onClick,
}) => {
  const { currentUser } = useAuth();

  return (
    <S.Card className={className} onClick={onClick}>
      <h4>Excellence Holdings</h4>
      <div className="card-number">
        <Icon type="icon-chip" className="chip" />
        <h2>{number}</h2>
      </div>
      <div className="holdermoney">
        <h5>{currentUser.displayName || 'Stranger'}</h5>
        {!isEditing && (
          <button className="edit" onClick={() => Router.push('/cardeditor')}>
            Edit
          </button>
        )}
        <h3>{formatAmount(amount) || formatAmount(10000)}</h3>
      </div>

      <Icon
        type={
          (provider === 'Visa' && 'icon-VISA') ||
          (provider === 'Master Card' && 'icon-MasterCard') ||
          (provider === 'American Express' && 'icon-americanexpress') ||
          'icon-VISA'
        }
        className="visa"
      />
    </S.Card>
  );
};

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Card = styled.div`
  border-radius: 30px;
  padding: 20px;
  position: relative;
  min-height: 230px;
  color: #fff;
  width: 440px;
  display: flex;
  margin: 0 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background: rgb(222, 82, 221);
  background: linear-gradient(
    45deg,
    #3454ff 18%,
    #218ff3 56%,
    rgb(222, 82, 221) 100%
  );

  h4 {
    letter-spacing: 1px;
  }

  h1 {
    color: #fff;
    letter-spacing: 3px;
  }

  .holdermoney {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .edit {
      border-radius: 5px;
      font-size: 14px;
      background-color: #fff;
      outline: 0;
      border: 0;
      padding: 7px 15px;
      font-weight: 600;
      cursor: pointer;
      color: ${({ theme }) => theme.colors.lightBlue};
    }
  }

  .card-number {
    display: flex;
    width: 100%;
    align-items: center;
    position: relative;
    justify-content: space-between;

    .chip {
      font-size: 40px !important;
      cursor: default !important;
    }

    h2 {
      font-family: 'Big Shoulders Display';
      letter-spacing: 7px;
    }
  }

  .visa {
    font-size: 50px !important;
    position: absolute;
    top: 7px;
    right: 20px;
    color: #fff;
    cursor: default !important;
  }
`;

export default Card;
