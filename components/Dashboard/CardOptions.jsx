import styled from 'styled-components';
import Icon from '../UI/Icon';

const CardOptions = () => {
  return (
    <S.CardOptions>
      <div className="card">
        <h3>Savo Kos</h3>
        <h1>$ 150.000</h1>
        <h4>3402 2424 3262 5628</h4>
        <Icon type="icon-visa" />
      </div>
      <S.CardFeatures>
        <div className="addbalance">
          <Icon type="icon-add" />
          <h3>Add Balance</h3>
          <Icon type="icon-arrow-right" />
        </div>
        <div className="movebalance">
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
  align-items: center;
  flex-direction: column;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 30px;

  .card {
    border-radius: 30px;
    padding: 20px;
    position: relative;
    min-height: 200px;
    width: 100%;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    background: rgb(123, 234, 207);
    background: linear-gradient(
      45deg,
      rgba(123, 234, 207, 1) 0%,
      rgba(82, 193, 245, 1) 39%,
      rgba(52, 84, 255, 1) 100%
    );

    h1 {
      color: #fff;
    }

    h4,
    h1 {
      letter-spacing: 3px;
    }

    .anticon {
      position: absolute;
      top: 20px;
      right: 20px;
      color: #fff;
    }
  }
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
