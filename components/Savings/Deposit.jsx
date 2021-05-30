import Icon from '../UI/Icon';

const Deposit = () => {
  return (
    <div>
      <div className="icon">
        <Icon type="icon-luggage-deposit-fill" />
      </div>
      <div className="info">
        <h3>Deposit</h3>
        <div className="money">
          <h3>$ 16.000</h3>
          <h4>$ 20.000</h4>
        </div>
        <div className="progressbar">
          <div className="fill"></div>
        </div>
        <div className="goal">
          <p>50% of your Deposit Goal!</p>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
