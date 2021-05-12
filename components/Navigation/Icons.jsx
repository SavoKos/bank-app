import { createFromIconfontCN } from '@ant-design/icons';

const Icon = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/font_2539603_5l1bnzzxk5e.js'],
});

const Icons = () => {
  const iconTypes = [
    'icon-dashboard',
    'icon-ic24-transaction',
    'icon-wallet',
    'icon-user',
    'icon-settings',
  ];

  const icons = iconTypes.map(type => (
    <Icon
      key={type}
      type={type}
      style={{
        fontSize: '25px',
        color: '#7c8ea4',
        cursor: 'pointer',
        margin: '-20px 0',
      }}
    />
  ));
  return icons;
};

export default Icons;
