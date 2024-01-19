import { groupBy, map, size } from 'lodash';
import React, { useEffect, useState } from 'react';
import { TSideMenu } from './types';
import { Card, Col, Divider, Menu, Row, Space } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TableLoader } from '@scs/ui';

function FilteredReports({ data, isSuccess, isLoading }: any) {
  const [list, setList] = useState<TSideMenu[]>([]);

  useEffect(() => {
    if (isSuccess) {
      const filteredReports = data?.data?.Data?.Result?.filter((item: any) => item.ModuleTypeId === 2);
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
  const accountsReports = list.filter((item) => item.ModuleDescription === 'Account Reports');

  const purchaseReports = list.filter((item) => item.ModuleDescription === 'Purchase Reports');
  const salesReports = list.filter((item) => item.ModuleDescription === 'Sales Reports');
  const InventoryReports = list.filter((item) => item.ModuleDescription === 'Inventory Reports');
  const StockReports = list.filter((item) => item.ModuleDescription === 'Stock Reports');
  console.log(purchaseReports);
  console.log(salesReports);
  console.log(InventoryReports);
  console.log(StockReports);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <>
      {isLoading ? (
        <div>
          <TableLoader numberOfSkeletons={5} />
        </div>
      ) : (
        <Space style={{ marginTop: '-0.5%' }}>
          <Row gutter={[6, 6]} style={{ width: '100%' }}>
            <Col xxl={9} xl={9} lg={10} md={9} sm={24} xs={24} style={{}}>
              <Card
                className="filtered_reports"
                cover={
                  <>
                    <h3> {accountsReports?.[0]?.ModuleDescription}</h3>
                    <Divider style={{ marginTop: '1%', marginBottom: '2%' }} />

                    {map(
                      accountsReports,
                      ({ ModuleDescription, children }: TSideMenu & { children: TSideMenu[] }, index: number) => (
                        <>
                          {map(children, ({ ScreenAlias }, i) => {
                            const path = ScreenAlias?.toLowerCase()?.replace(/ /g, '-');
                            return (
                              <Card
                                bordered={false}
                                onClick={() => navigate(`/${path}`)}
                                className="filtered_cards"
                                hoverable
                                style={{
                                  borderBottom: '1px solid lightgray',
                                  borderRadius: '0px',
                                  marginBottom: '0%',
                                  height: '5rem',
                                }}
                                cover={
                                  <>
                                    <Link to={''}>
                                      <h4
                                        style={{
                                          color: '#21E298',
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          marginTop: '-0.5%',
                                        }}
                                      >
                                        {ScreenAlias}
                                        <StarOutlined style={{ fontSize: '18px' }} />
                                      </h4>
                                    </Link>
                                    <p style={{ color: 'gray' }}>description </p>
                                  </>
                                }
                              ></Card>
                            );
                          })}
                        </>
                      )
                    )}
                  </>
                }
              ></Card>
            </Col>
            <Col xxl={15} xl={15} lg={14} md={15} sm={24} xs={24} style={{}}>
              <Row gutter={[6, 6]} style={{}}>
                <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
                  <Card
                    className="filtered_reports"
                    cover={
                      <>
                        <h3> {purchaseReports?.[0]?.ModuleDescription}</h3>
                        <Divider style={{ marginTop: '2%', marginBottom: '2%' }} />

                        {map(
                          purchaseReports,
                          ({ ModuleDescription, children }: TSideMenu & { children: TSideMenu[] }, index: number) => (
                            <>
                              {map(children, ({ ScreenAlias }, i) => {
                                const path = ScreenAlias?.toLowerCase()?.replace(/ /g, '-');
                                return (
                                  <Card
                                    onClick={() => navigate(`/${path}`)}
                                    hoverable
                                    style={{ border: '1px solid #21E298', marginBottom: '0.5%', height: '5rem' }}
                                  >
                                    <Link to={''}>
                                      <h4
                                        style={{
                                          color: '#21E298',
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          marginTop: '-0.5%',
                                        }}
                                      >
                                        {ScreenAlias}
                                        <StarOutlined style={{ fontSize: '18px' }} />
                                      </h4>
                                    </Link>
                                    <p style={{ color: 'gray' }}>description</p>
                                  </Card>
                                );
                              })}
                            </>
                          )
                        )}
                      </>
                    }
                  ></Card>
                </Col>
                <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
                  <Card
                    className="filtered_reports"
                    cover={
                      <>
                        <h3> {salesReports?.[0]?.ModuleDescription}</h3>
                        <Divider style={{ marginTop: '2%', marginBottom: '2%' }} />

                        {map(
                          salesReports,
                          ({ ModuleDescription, children }: TSideMenu & { children: TSideMenu[] }, index: number) => (
                            <>
                              {map(children, ({ ScreenAlias }, i) => {
                                const path = ScreenAlias?.toLowerCase()?.replace(/ /g, '-');
                                return (
                                  <Card
                                    onClick={() => navigate(`/${path}`)}
                                    hoverable
                                    style={{ border: '1px solid #21E298', marginBottom: '0.5%', height: '5rem' }}
                                  >
                                    <Link to={''}>
                                      <h4
                                        style={{
                                          color: '#21E298',
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          marginTop: '-0.5%',
                                        }}
                                      >
                                        {ScreenAlias}
                                        <StarOutlined style={{ fontSize: '18px' }} />
                                      </h4>
                                    </Link>
                                    <p style={{ color: 'gray' }}>description</p>
                                  </Card>
                                );
                              })}
                            </>
                          )
                        )}
                      </>
                    }
                  ></Card>
                </Col>
              </Row>
              <Row gutter={[6, 6]} style={{ marginTop: '1%' }}>
                <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
                  <Card
                    className="filtered_reports"
                    cover={
                      <>
                        <h3> {StockReports?.[0]?.ModuleDescription}</h3>
                        <Divider style={{ marginTop: '2%', marginBottom: '2%' }} />

                        {map(
                          StockReports,
                          ({ ModuleDescription, children }: TSideMenu & { children: TSideMenu[] }, index: number) => (
                            <>
                              {map(children, ({ ScreenAlias }, i) => {
                                const path = ScreenAlias?.toLowerCase()?.replace(/ /g, '-');
                                return (
                                  <Card
                                    onClick={() => navigate(`/${path}`)}
                                    hoverable
                                    style={{ border: '1px solid #21E298', marginBottom: '0.5%', height: '6rem' }}
                                  >
                                    <Link to={''}>
                                      <h4
                                        style={{
                                          color: '#21E298',
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          marginTop: '-0.5%',
                                        }}
                                      >
                                        {ScreenAlias}
                                        <StarOutlined style={{ fontSize: '18px' }} />
                                      </h4>
                                    </Link>
                                    <p style={{ color: 'gray' }}>description</p>
                                  </Card>
                                );
                              })}
                            </>
                          )
                        )}
                      </>
                    }
                  ></Card>
                </Col>
                <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
                  <Card
                    className="filtered_reports"
                    cover={
                      <>
                        <h3> {InventoryReports?.[0]?.ModuleDescription}</h3>
                        <Divider style={{ marginTop: '2%', marginBottom: '2%' }} />

                        {map(
                          InventoryReports,
                          ({ ModuleDescription, children }: TSideMenu & { children: TSideMenu[] }, index: number) => (
                            <>
                              {map(children, ({ ScreenAlias }, i) => {
                                const path = ScreenAlias?.toLowerCase()?.replace(/ /g, '-');
                                return (
                                  <Card
                                    onClick={() => navigate(`/${path}`)}
                                    hoverable
                                    style={{ border: '1px solid #21E298', marginBottom: '0.5%', height: '5rem' }}
                                  >
                                    <Link to={''}>
                                      <h4
                                        style={{
                                          color: '#21E298',
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          marginTop: '-0.5%',
                                        }}
                                      >
                                        {ScreenAlias}
                                        <StarOutlined style={{ fontSize: '18px' }} />
                                      </h4>
                                    </Link>
                                    <p style={{ color: 'gray' }}>description</p>
                                  </Card>
                                );
                              })}
                            </>
                          )
                        )}
                      </>
                    }
                  ></Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Space>
      )}
    </>
  );
}

export default FilteredReports;
