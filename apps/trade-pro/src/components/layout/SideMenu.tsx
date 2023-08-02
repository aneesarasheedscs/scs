import { Menu, Result } from 'antd';
import { TSideMenu } from './types';
import { useGetMenu } from './queries';
import { groupBy, map, size } from 'lodash';
import { useEffect, useState } from 'react';
import { AntButton, TableLoader } from '..';
import { Link, useLocation } from 'react-router-dom';

function SideMenu() {
  const { pathname } = useLocation();
  const { data, isError, refetch, isSuccess, isLoading } = useGetMenu();

  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    if (isSuccess) {
      setList(menuList(data?.data?.Data?.Result));
    }
  }, [data, isSuccess]);

  if (isError) {
    return (
      <Result
        title=""
        status="error"
        style={{ marginTop: '10em' }}
        subTitle="Sorry, something went wrong"
        extra={[<AntButton label="Retry" onClick={refetch} />]}
      />
    );
  }

  if (isLoading) {
    return (
      <div style={{ padding: 15 }}>
        <TableLoader numberOfSkeletons={13} />
      </div>
    );
  }

  const menuList = (data: TSideMenu[]) => {
    if (size(data) > 0) {
      const groupedData = groupBy(data, (item) => `${item.ModuleID}-${item.ModuleDescription}`);

      return map(groupedData, (group) => {
        const [firstItem] = group;
        return {
          children: group,
          ...firstItem,
        };
      });
    }

    return [];
  };

  return (
    <Menu mode="inline" style={{ paddingTop: 10, height: '100%' }}>
      {map(
        list,
        ({ ModuleDescription, children }: TSideMenu & { children: TSideMenu[] }, index: number) => (
          <Menu.SubMenu key={index} title={ModuleDescription}>
            {map(children, ({ ScreenAlias }, i) => {
              const path = ScreenAlias?.toLowerCase()?.replace(/ /g, '-');
              return (
                <Menu.Item
                  key={i}
                  className={path === pathname ? 'ant-menu-item-active ant-menu-item-selected' : ''}
                >
                  <Link to={path}>{ScreenAlias}</Link>
                </Menu.Item>
              );
            })}
          </Menu.SubMenu>
        )
      )}
    </Menu>
  );
}

export default SideMenu;
