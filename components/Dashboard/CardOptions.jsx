import styled from 'styled-components';
import Card from '../UI/Card';
import Icon from '../UI/Icon';
import Router from 'next/router';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const CardOptions = ({ cards }) => {
  let cardList = [];
  if (cards)
    cardList = cards.map(card => (
      <Card
        className="card"
        isEditing={false}
        amount={card.amount}
        number={card.number}
        provider={card.provider}
      />
    ));
  const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
  };

  const displayCards =
    cards.length > 0 ? (
      <>
        <S.Slider>
          <AliceCarousel
            mouseTracking
            items={cardList}
            responsive={responsive}
          />
        </S.Slider>
      </>
    ) : (
      <h2 className="addCard" onClick={() => Router.push('/cardeditor')}>
        Add cards
      </h2>
    );

  return (
    <S.CardOptions>
      <S.CardSlider>{displayCards}</S.CardSlider>
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
        <div className="savings" onClick={() => Router.push('/savings')}>
          <Icon type="icon-piggy-bank" />
          <h3>Savings</h3>
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

  @media (max-width: 1400px) {
    .card {
      min-width: unset;
      width: 96%;

      .card-number h2 {
        letter-spacing: 3px;
      }
    }
  }

  @media (max-width: 1200px) {
    .card {
      min-width: 440px;
      width: 97%;

      .card-number h2 {
        letter-spacing: 7px;
      }
    }
  }

  @media (max-width: 576px) {
    .card {
      min-width: unset;
      width: 96%;

      .card-number h2 {
        letter-spacing: 3px;
      }
    }
  }

  .card {
    cursor: default;
  }
  .addCard {
    text-decoration: underline;
    margin-top: 20px;
    color: ${({ theme }) => theme.colors.lightBlue};
    cursor: pointer;
  }

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
    &.sendandpay,
    &.savings {
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

S.Slider = styled.div`
  width: 100%;
  margin: auto;

  .addCard {
    padding: 10px;
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.lightBlue};
    cursor: pointer;
    width: fit-content;
  }

  .alice-carousel {
    max-width: 460px;
  }

  .alice-carousel__prev-btn,
  .alice-carousel__next-btn {
    padding: 10px 15px;
    font-size: 30px;
  }

  .alice-carousel__next-btn-item:hover,
  .alice-carousel__prev-btn-item:hover {
    color: ${({ theme }) => theme.colors.lightBlue};
  }

  .alice-carousel__dots-item:not(.__custom) {
    background-color: #a8afcb;
  }

  .alice-carousel__dots-item:not(.__custom).__active {
    background-color: #6e7ebc;
  }
`;

export default CardOptions;
