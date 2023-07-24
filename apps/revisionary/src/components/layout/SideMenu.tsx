import { Menu } from 'antd';
import { sidebarList } from './constant';
import { Link, useLocation } from 'react-router-dom';

function SideMenu() {
  const { pathname } = useLocation();

  return (
    <Menu mode="inline" style={{ paddingTop: 10, height: '100%' }}>
      {sidebarList.map(({ path, label, Icon }, index) => (
        <Menu.Item
          key={index}
          icon={<Icon />}
          className={path === pathname ? 'ant-menu-item-active ant-menu-item-selected' : ''}
        >
          <Link to={path}>{label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default SideMenu;
