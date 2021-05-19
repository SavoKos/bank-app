import styled from 'styled-components';
import Icon from '../../UI/Icon';

const CardOptions = () => {
  return (
    <S.CardOptions>
      <div className="card">
        <Icon type="icon-visa" />
      </div>
    </S.CardOptions>
  );
};

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.CardOptions = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 40px;

  .card {
    border-radius: 30px;
    padding: 20px;
    position: relative;
    height: 200px;
    width: 100%;
    background-color: blue;

    .anticon {
      position: absolute;
      top: 10px;
      right: 10px;
      color: #fff;
    }
  }
`;

export default CardOptions;
