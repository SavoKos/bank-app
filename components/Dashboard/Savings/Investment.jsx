import Icon from '../../UI/Icon';

const Investment = () => {
  return (
    <div>
      <div className="icon investment">
        <Icon type="icon-savings" />
      </div>
      <div className="info">
        <h4>Investment</h4>
        <div className="money">
          <h3>$ 16.000</h3>
          <h4>$ 20.000</h4>
        </div>
        <div className="progressbar">
          <div className="fill"></div>
        </div>
        <div className="goal">
          <p>50% of your Investment Goal!</p>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------- styling ----------------------------------------------

export default Investment;
