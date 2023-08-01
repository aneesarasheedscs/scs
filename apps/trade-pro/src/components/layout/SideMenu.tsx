import { Menu } from 'antd';
import { sidebarList } from './constant';
import { Link, useLocation } from 'react-router-dom';
import { useGetMenu } from './queries';

function SideMenu() {
  const { pathname } = useLocation();
  const { data } = useGetMenu();

  console.log(data);

  return (
    <Menu mode="inline" style={{ paddingTop: 10, height: '100%' }}>
      {sidebarList.map(({ path, label }, index) => (
        <Menu.Item
          key={index}
          className={path === pathname ? 'ant-menu-item-active ant-menu-item-selected' : ''}
        >
          <Link to={path}>{label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default SideMenu;
