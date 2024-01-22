import { groupBy, map, size } from 'lodash';
import React, { useEffect, useState } from 'react';
import { TAddtoFavoriteScreens, TSideMenu } from './types';
import { Card, Col, Divider, Menu, Row, Space, notification, theme } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { TableLoader } from '@tradePro/components';
import { useAddFavoriteScreens } from './query';

function FilteredReports({ data, isSuccess, isLoading }: any) {
  const [list, setList] = useState<TSideMenu[]>([]);
  const [reportData, setReportData] = useState<boolean>(false);
  const [screenData, setScreenData] = useState<TAddtoFavoriteScreens | any>({
    ScreenName: '',
    ScreenId: undefined,
    ScreenTitle: '',
    ScreenRoute: '',
    TargetUrl: '',
    ModuleTypeId: undefined,
    ScreenDescription: '',
  });
  const { ScreenName, ScreenId, ScreenTitle, ScreenRoute, TargetUrl, ModuleTypeId, ScreenDescription } = screenData;
  const { mutate } = useAddFavoriteScreens();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const navigate = useNavigate();
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

  const handleAddtoFavoritScreens = (
    screenTitle?: string,
    ScreenID?: number,
    ModuleTypeId?: number,
    TargetUrl?: string,
    ScreenDescription?: string,
    RouteUrl?: string
  ) => {
    console.log('ScreenTitle', screenTitle);
    const formattedScreenName = screenTitle?.replace(/\s/g, '');

    setScreenData({
      ScreenName: formattedScreenName,
      ScreenId: ScreenID,
      ScreenTitle: screenTitle,
      ScreenRoute: RouteUrl,
      TargetUrl: TargetUrl,
      ModuleTypeId: ModuleTypeId,
      ScreenDescription: ScreenDescription,
    });
    setReportData(true);
    // if (ScreenName === undefined && ScreenTitle === undefined && ScreenId === undefined && ModuleTypeId === undefined) {
    //   const msg = 'Something went wrong';
    //   notification.error({ description: '', message: msg as string });
    // } else {
    //   mutate(screenData);
    // }
  };
  useEffect(() => {
    if (reportData === true) {
      mutate(screenData);
      console.log('mutate');
    } else {
      console.log('no mutate');
    }
  }, [reportData, screenData]);
  console.log(screenData);

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
                    <Divider style={{ marginTop: '1%', marginBottom: '0%' }} />

                    {map(
                      accountsReports,
                      ({ ModuleDescription, children }: TSideMenu & { children: TSideMenu[] }, index: number) => (
                        <>
                          {map(
                            children,
                            ({ ScreenAlias, ScreenDescription, ScreenID, ModuleTypeId, TargetUrl, RouteUrl }, i) => {
                              const path = ScreenAlias?.toLowerCase()?.replace(/ /g, '-');
                              return (
                                <Card
                                  bordered={false}
                                  className="filtered_cards"
                                  hoverable
                                  style={{
                                    borderBottom: '1px solid lightgray',
                                    borderRadius: '0px',
                                    marginBottom: '0%',
                                    height: '4.5rem',
                                  }}
                                  cover={
                                    <>
                                      <h4
                                        style={{
                                          color: `${colorPrimary}`,
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          marginTop: '0.5%',
                                        }}
                                      >
                                        <span onClick={() => navigate(`/${path}`)}> {ScreenAlias}</span>
                                        <StarOutlined
                                          onClick={() =>
                                            handleAddtoFavoritScreens(
                                              ScreenAlias,
                                              ScreenID,
                                              ModuleTypeId,
                                              TargetUrl,
                                              ScreenDescription,
                                              RouteUrl
                                            )
                                          }
                                          style={{ color: 'gray', fontSize: '18px' }}
                                        />
                                      </h4>

                                      <p style={{ color: 'gray' }}> {ScreenDescription} </p>
                                    </>
                                  }
                                ></Card>
                              );
                            }
                          )}
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
                        <Divider style={{ marginTop: '1%', marginBottom: '0%' }} />

                        {map(
                          purchaseReports,
                          ({ ModuleDescription, children }: TSideMenu & { children: TSideMenu[] }, index: number) => (
                            <>
                              {map(
                                children,
                                (
                                  { ScreenAlias, ScreenDescription, ScreenID, ModuleTypeId, TargetUrl, RouteUrl },
                                  i
                                ) => {
                                  const path = ScreenAlias?.toLowerCase()?.replace(/ /g, '-');
                                  return (
                                    <Card
                                      hoverable
                                      bordered={false}
                                      className="filtered_cards"
                                      style={{
                                        borderBottom: '1px solid lightgray',
                                        borderRadius: '0px',
                                        marginBottom: '0%',
                                        height: '4rem',
                                      }}
                                      cover={
                                        <>
                                          <h4
                                            style={{
                                              color: `${colorPrimary}`,
                                              display: 'flex',
                                              justifyContent: 'space-between',
                                              marginTop: '0.5%',
                                            }}
                                          >
                                            <span onClick={() => navigate(`/${path}`)}> {ScreenAlias}</span>
                                            <StarOutlined
                                              onClick={() =>
                                                handleAddtoFavoritScreens(
                                                  ScreenAlias,
                                                  ScreenID,
                                                  ModuleTypeId,
                                                  TargetUrl,
                                                  ScreenDescription,
                                                  RouteUrl
                                                )
                                              }
                                              style={{ color: 'gray', fontSize: '18px' }}
                                            />
                                          </h4>

                                          <p style={{ color: 'gray' }}> {ScreenDescription}</p>
                                        </>
                                      }
                                    ></Card>
                                  );
                                }
                              )}
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
                        <Divider style={{ marginTop: '1%', marginBottom: '0%' }} />

                        {map(
                          salesReports,
                          ({ ModuleDescription, children }: TSideMenu & { children: TSideMenu[] }, index: number) => (
                            <>
                              {map(
                                children,
                                (
                                  { ScreenAlias, ScreenDescription, ScreenID, ModuleTypeId, TargetUrl, RouteUrl },
                                  i
                                ) => {
                                  const path = ScreenAlias?.toLowerCase()?.replace(/ /g, '-');
                                  return (
                                    <Card
                                      hoverable
                                      bordered={false}
                                      className="filtered_cards"
                                      style={{
                                        borderBottom: '1px solid lightgray',
                                        borderRadius: '0px',
                                        marginBottom: '0%',
                                        height: '4rem',
                                      }}
                                      cover={
                                        <>
                                          <h4
                                            style={{
                                              color: `${colorPrimary}`,
                                              display: 'flex',
                                              justifyContent: 'space-between',
                                              marginTop: '0.5%',
                                            }}
                                          >
                                            <span onClick={() => navigate(`/${path}`)}> {ScreenAlias}</span>
                                            <StarOutlined
                                              onClick={() =>
                                                handleAddtoFavoritScreens(
                                                  ScreenAlias,
                                                  ScreenID,
                                                  ModuleTypeId,
                                                  TargetUrl,
                                                  ScreenDescription,
                                                  RouteUrl
                                                )
                                              }
                                              style={{ color: 'gray', fontSize: '18px' }}
                                            />
                                          </h4>

                                          <p style={{ color: 'gray' }}>{ScreenDescription}</p>
                                        </>
                                      }
                                    ></Card>
                                  );
                                }
                              )}
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
                        <Divider style={{ marginTop: '1%', marginBottom: '0%' }} />

                        {map(
                          StockReports,
                          ({ ModuleDescription, children }: TSideMenu & { children: TSideMenu[] }, index: number) => (
                            <>
                              {map(
                                children,
                                (
                                  { ScreenAlias, ScreenDescription, ScreenID, ModuleTypeId, TargetUrl, RouteUrl },
                                  i
                                ) => {
                                  const path = ScreenAlias?.toLowerCase()?.replace(/ /g, '-');
                                  return (
                                    <Card
                                      hoverable
                                      bordered={false}
                                      className="filtered_cards"
                                      style={{
                                        borderBottom: '1px solid lightgray',
                                        borderRadius: '0px',
                                        marginBottom: '0%',
                                        height: '4rem',
                                      }}
                                      cover={
                                        <>
                                          <h4
                                            style={{
                                              color: `${colorPrimary}`,
                                              display: 'flex',
                                              justifyContent: 'space-between',
                                              marginTop: '0.5%',
                                            }}
                                          >
                                            <span onClick={() => navigate(`/${path}`)}> {ScreenAlias}</span>
                                            <StarOutlined
                                              onClick={() =>
                                                handleAddtoFavoritScreens(
                                                  ScreenAlias,
                                                  ScreenID,
                                                  ModuleTypeId,
                                                  TargetUrl,
                                                  ScreenDescription,
                                                  RouteUrl
                                                )
                                              }
                                              style={{ color: 'gray', fontSize: '18px' }}
                                            />
                                          </h4>

                                          <p style={{ color: 'gray' }}>{ScreenDescription} </p>
                                        </>
                                      }
                                    ></Card>
                                  );
                                }
                              )}
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
                        <Divider style={{ marginTop: '1%', marginBottom: '0%' }} />

                        {map(
                          InventoryReports,
                          ({ ModuleDescription, children }: TSideMenu & { children: TSideMenu[] }, index: number) => (
                            <>
                              {map(
                                children,
                                (
                                  { ScreenAlias, ScreenDescription, ScreenID, ModuleTypeId, TargetUrl, RouteUrl },
                                  i
                                ) => {
                                  const path = ScreenAlias?.toLowerCase()?.replace(/ /g, '-');
                                  return (
                                    <Card
                                      hoverable
                                      bordered={false}
                                      className="filtered_cards"
                                      style={{
                                        borderBottom: '1px solid lightgray',
                                        borderRadius: '0px',
                                        marginBottom: '0%',
                                        height: '4rem',
                                      }}
                                      cover={
                                        <>
                                          <h4
                                            style={{
                                              color: `${colorPrimary}`,
                                              display: 'flex',
                                              justifyContent: 'space-between',
                                              marginTop: '0.5%',
                                            }}
                                          >
                                            <span onClick={() => navigate(`/${path}`)}> {ScreenAlias}</span>
                                            <StarOutlined
                                              onClick={() =>
                                                handleAddtoFavoritScreens(
                                                  ScreenAlias,
                                                  ScreenID,
                                                  ModuleTypeId,
                                                  TargetUrl,
                                                  ScreenDescription,
                                                  RouteUrl
                                                )
                                              }
                                              style={{ color: 'gray', fontSize: '18px' }}
                                            />
                                          </h4>

                                          <p style={{ color: 'gray' }}>{ScreenDescription} </p>
                                        </>
                                      }
                                    ></Card>
                                  );
                                }
                              )}
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
