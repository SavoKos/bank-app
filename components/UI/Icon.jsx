import { createFromIconfontCN } from '@ant-design/icons';

const CreatedIcon = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/font_2539603_5374hbb3jm7.js'],
});

const Icon = ({ type, style, clicked, className }) => {
  return (
    <CreatedIcon
      className={className}
      type={type}
      onClick={clicked}
      style={{ fontSize: '25px', cursor: 'pointer', ...style }}
    />
  );
};

export default Icon;
