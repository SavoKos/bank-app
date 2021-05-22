import styled from 'styled-components';
import Card from '../UI/Card';
import Icon from '../UI/Icon';
import Router from 'next/router';

const CardOptions = () => {
  return (
    <S.CardOptions>
      <Card />
      <S.CardFeatures>
        <div
          className="addbalance"
          onClick={() => Router.push('/transactions')}
        >
          <Icon type="icon-add" />
          <h3>Add Balance</h3>
          <Icon type="icon-arrow-right" />
        </div>
        <div
          className="movebalance"
          onClick={() => Router.push('/transactions')}
        >
          <Icon type="icon-account-transfer" />
          <h3>Move Balance</h3>
          <Icon type="icon-arrow-right" />
        </div>
        <div className="sendandpay">
          <Icon type="icon-Payment1" />
          <h3>Send and Pay</h3>
          <Icon type="icon-arrow-right" />
        </div>
        <div className="payqr">
          <Icon type="icon-Qr_code" />
          <h3>Pay by QR</h3>
          <Icon type="icon-arrow-right" />
        </div>
      </S.CardFeatures>
      <S.Invite>
        <h2>Invite your Friends</h2>
        <p>Maximize your experience by sharing it with others.</p>
        <Icon type="icon-arrow-top-right" />
      </S.Invite>
    </S.CardOptions>
  );
};

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.CardOptions = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 28% !important;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 30px;
`;

S.CardFeatures = styled.div`
  width: 100%;
  margin-top: 30px;
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 10px;
    background-color: #fff;
    cursor: pointer;

    &.addbalance {
      border-radius: 20px 20px 0 0;
    }

    &.addbalance,
    &.movebalance,
    &.sendandpay {
      border-bottom: 1px solid #ddd;
    }

    &.payqr {
      border-radius: 0 0 20px 20px;
    }

    .anticon {
      color: #b1b1b1;
    }
  }
`;

S.Invite = styled.div`
  margin-top: 30px;
  border-radius: 20px;
  padding: 30px;
  position: relative;
  width: 100%;
  background-color: #fff;

  p {
    color: #fff;
    color: ${({ theme }) => theme.colors.secondary};
  }

  .anticon {
    position: absolute;
    top: 10px;
    font-size: 17px !important;
    padding: 3px;
    right: 10px;
    color: ${({ theme }) => theme.colors.lightBlue};
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
  }
`;

export default CardOptions;
