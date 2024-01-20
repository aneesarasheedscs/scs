import { Card, Col, Row, Space } from 'antd';
import { groupBy, map, size } from 'lodash';
import React, { useEffect, useState } from 'react';
import { TSideMenu } from '../types';
import { StarFilled } from '@ant-design/icons';
import { TableLoader } from '@scs/ui';
function Favorites({ data, isSuccess, isLoading }: any) {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    if (isSuccess) {
      const filteredReports = data?.data?.Data?.Result?.filter(
        (item: any) => item.ModuleTypeId === 2 && item.IsFavorite === true
      );
      setList(menuList(filteredReports));
    }
  }, [data, isSuccess]);
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
  console.log(list);
  //   const accountsReports = list.filter((item) => item.ModuleDescription === 'Account Reports');

  return (
    <>
      {isLoading ? (
        <div>
          <TableLoader numberOfSkeletons={3} />
        </div>
      ) : (
        <Space style={{}}>
          <Row gutter={[6, 0]} style={{ width: '100%' }}>
            {map(list, ({ ModuleDescription }: TSideMenu & { children: TSideMenu[] }, index: number) => (
              <Col xs={24} xxl={8} xl={8} sm={12} md={12} lg={12}>
                <Card hoverable style={{ border: '1px solid #21E298', height: '90%' }}>
                  <h4
                    style={{ color: '#21E298', display: 'flex', justifyContent: 'space-between', marginTop: '-0.5%' }}
                  >
                    <span>{ModuleDescription}</span> <StarFilled style={{ fontSize: '18px' }} />
                  </h4>
                  <p style={{ color: 'gray' }}>description</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Space>
      )}
    </>
  );
}

export default Favorites;
