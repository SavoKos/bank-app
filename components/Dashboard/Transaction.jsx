import styled from 'styled-components';
import Image from 'next/image';

const Transaction = () => {
  return (
    <S.Transaction>
      <div className="left">
        <Image
          src="/navigationLogo.png"
          height={35}
          width={35}
          layout="fixed"
        />
        <div className="info">
          <h4>Netflix</h4>
          <p>23.08.2021</p>
        </div>
      </div>
      <div className="right">
        <h4>$16.000</h4>
        <p>Income</p>
      </div>
    </S.Transaction>
  );
};

export default Transaction;

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Transaction = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 0 30px;

  .left {
    display: flex;
    align-items: center;

    .info {
      margin-left: 25px;
    }
  }
`;
