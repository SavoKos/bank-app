import styled from 'styled-components';
import Card from '../UI/Card';
import Icon from '../UI/Icon';
import Router from 'next/router';

const CardOptions = () => {
  return (
    <S.CardOptions>
      <S.CardSlider>
        <button disabled>
          <Icon type="icon-fanhui" className="arrow left" />
        </button>
        <Card />
        <button>
          <Icon type="icon-gengduo" className="arrow right" />
        </button>
      </S.CardSlider>
      <S.CardFeatures>
        <div
          className="addbalance"
          onClick={() => Router.push('/transactions')}
        >
          <Icon type="icon-4" />
          <h3>Loan</h3>
          <Icon type="icon-gengduo" />
        </div>
        <div
          className="movebalance"
          onClick={() => Router.push('/transactions')}
        >
          <Icon type="icon-account-transfer" />
          <h3>Transfer</h3>
          <Icon type="icon-gengduo" />
        </div>
        <div className="sendandpay">
          <Icon type="icon-Payment1" />
          <h3>Send and Pay</h3>
          <Icon type="icon-gengduo" />
        </div>
        <div className="payqr">
          <Icon type="icon-Qr_code" />
          <h3>Pay by QR</h3>
          <Icon type="icon-gengduo" />
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
`;

S.CardSlider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;

  button {
    border: 0;
    outline: 0;
    background-color: ${({ theme }) => theme.colors.lightBlue};
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    border-radius: 50%;

    &:disabled {
      pointer-events: none;
      background-color: ${({ theme }) => theme.colors.secondary};
      color: #fff;
      opacity: 0.5;
    }
  }

  .arrow {
    padding: 3px;
    font-size: 20px;
    pointer-events: none;
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
