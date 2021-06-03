import S from '../../styles/styledComponents';

const Spinner = ({ absolute = true }) => {
  const position = `${absolute ? 'absolute' : 'static'}`;
  return <S.Spinner style={{ position: position }} />;
};

export default Spinner;
