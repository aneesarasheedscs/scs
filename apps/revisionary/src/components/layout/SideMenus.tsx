import { Menu, Result } from 'antd';
import { groupBy, map, size } from 'lodash';
import { useEffect, useState } from 'react';
import { AntButton, TableLoader } from '..';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { menuAtom } from '@revisionary/pages/login/Form/atom';
import { TAppUserData } from '@revisionary/pages/Syllabus_Management/types';

function SideMenu() {
  const navigate = useNavigate();
  // const { data, isError, refetch, isSuccess, isLoading } = useGetMenu();
  const [menuItems, setMenuItems] = useAtom(menuAtom);

  const [list, setList] = useState<any[]>([]);
  // console.log(menuItems?.loginUserModules);
  console.log(list);
  const userDetail: TAppUserData = JSON.parse(localStorage.getItem('userDetail') || '{}');
  console.log(userDetail?.loginUserModules);
  useEffect(() => {
    if (!!menuItems) {
      setList(menuList(menuItems?.loginUserModules));
      // console.log(list);
    } else {
      setList(menuList(userDetail?.loginUserModules));
    }
    setList(menuList(userDetail?.loginUserModules));
  }, [menuItems]);

  // if (isError) {
  //   return (
  //     <Result
  //       title=""
  //       status="error"
  //       style={{ marginTop: '10em' }}
  //       subTitle="Sorry, something went wrong"
  //       extra={[<AntButton label="Retry" onClick={refetch} />]}
  //     />
  //   );
  // }

  // if (isLoading) {
  //   return (
  //     <div style={{ padding: 15 }}>
  //       <TableLoader numberOfSkeletons={13} />
  //     </div>
  //   );
  // }

  const menuList = (data: any[]) => {
    if (size(data) > 0) {
      const groupedData = groupBy(data, (item) => `${item.appProductModuleId}-${item.appModuleName}`);

      const result = map(groupedData, (group) => {
        const [firstItem] = group;
        return { children: group, ...firstItem };
      });

      return map(result, (item, index) => ({
        label: item?.appModuleName,
        key: `${index} ${item?.appModuleName}`,
        children: map(item?.children, (childItem, i) => ({
          key: `${childItem?.targetSource}`,
          label: childItem?.appModuleName,
        })),
      }));
    }

    return [];
  };

  return (
    <Menu mode="inline" items={list} onClick={({ key }) => navigate(key)} style={{ paddingTop: 10, height: '100%' }} />
  );
}

export default SideMenu;
