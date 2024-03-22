import { theme } from 'antd';
import { TChildren, TSideMenu } from './types';
import * as AntIcons from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Row, Col, Typography, Modal } from 'antd';
import { useGetMenu } from '@tradePro/components/layout/queries';
import { AntSelectDynamic, TableLoader } from '@tradePro/components';
import { groupBy, map, size } from '@tradePro/utils/lodashUtils';

const { Title, Text } = Typography;

export default function MenuDashboard() {
  const { data: Menu, isLoading: isLoadingMenu, isSuccess } = useGetMenu();
  const { t } = useTranslation();
  const [list, setList] = useState<TSideMenu[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [childrenList, setChildrenList] = useState<TChildren[]>([]);
  const navigate = useNavigate();
  const handleNavigate = (RouteUrl: string) => {
    navigate(RouteUrl);
  };

  const handleNavigatewithSelectOption = (value: string) => {
    console.log(value);
    const RouteUrl = Menu?.data?.Data?.Result?.find((item: any) => item.ScreenID === value);
    console.log(RouteUrl?.RouteUrl);
    navigate(RouteUrl?.RouteUrl);
  };
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const showModal = (index: any) => {
    console.log(list?.[index]?.children);
    setChildrenList(list?.[index]?.children);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isSuccess && !isLoadingMenu) {
      console.log(menuList2(Menu?.data?.Data?.Result));
      setList(menuList2(Menu?.data?.Data?.Result));
    }
  }, [Menu, isSuccess]);
  const menuList2 = (data: any[]) => {
    if (size(data) > 0) {
      const groupedData = groupBy(data, (item) => `${item.ModuleID}-${item.ModuleDescription}`);
      console.log(groupedData);
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
  if (isLoadingMenu) {
    return (
      <div style={{ padding: 15 }}>
        <TableLoader numberOfSkeletons={13} />
      </div>
    );
  }

  console.log(childrenList);
  const childrenLengths = map(list, (item) => item.children.length);
  const defaultIcons = [
    <AntIcons.DashboardOutlined />,
    <AntIcons.AccountBookOutlined />,
    <AntIcons.TransactionOutlined />,
    <AntIcons.FileDoneOutlined />,
    <AntIcons.ShopOutlined />,
    <AntIcons.FileTextOutlined />,
    <AntIcons.ShoppingOutlined />,
    <AntIcons.FileOutlined />,
    <AntIcons.AppstoreOutlined />,
    <AntIcons.FileTextOutlined />,
    <AntIcons.FileTextOutlined />,
    <AntIcons.AppstoreOutlined />,
    <AntIcons.DollarOutlined />,
    <AntIcons.SettingOutlined />,
  ];

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row
            gutter={[10, 10]}
            style={{
              border: `1px solid ${colorPrimary}`,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              width: '100%',
            }}
          >
            <Col xs={24} sm={24} md={24} xl={24} xxl={24} className="formHeading">
              <Row gutter={[10, 10]} className="app_header" style={{ backgroundColor: colorPrimary }}>
                <Col xxl={24} xs={24} xl={24} md={24} className="headerstyle">
                  <Col xxl={13} xl={10} md={5} className="module-heading">
                    <h2>{t('app_modules')}</h2>
                  </Col>

                  <Col xxl={4} xl={6} lg={12} md={12} sm={12} xs={24} className="menu-search-bar">
                    <AntSelectDynamic
                      showSearch={true}
                      placeholder="Search"
                      label=""
                      fieldValue="Id"
                      fieldLabel="ModuleDescription"
                      name=""
                      options={list
                        .flatMap((menuItem, index) => menuItem.children)
                        .map((item) => ({
                          value: item.ScreenID,
                          label: item.ScreenAlias,
                        }))}
                      onChange={(value) => handleNavigatewithSelectOption(value)}
                    />
                    {/* <Search
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search"
                        style={{ width: 200 }}
                      /> */}
                  </Col>
                </Col>
              </Row>
            </Col>
            <Col xxl={24} xs={23} sm={23} md={24} lg={24} xl={24} style={{ marginLeft: '-1%' }}>
              <Row justify={'center'} gutter={10} style={{ marginLeft: '' }}>
                {map(list, ({ ModuleDescription }: TSideMenu & { children: TSideMenu[] }, index: number) => (
                  <Col xs={24} xxl={4} sm={12} md={11} lg={6} key={index}>
                    <Card
                      hoverable
                      onClick={() => showModal(index)}
                      className="container_menuCard"
                      style={{
                        border: `1px solid ${colorPrimary}`,
                      }}
                    >
                      <div
                        className="menuCard_div"
                        style={{
                          backgroundColor: colorPrimary,
                        }}
                      >
                        <Title level={4} style={{ color: '#fff', fontWeight: 700, margin: 5 }}>
                          {childrenLengths[index % childrenLengths.length]}
                        </Title>
                      </div>
                      <br></br>
                      <div
                        className="menu_icon_div"
                        style={{
                          color: colorPrimary,
                        }}
                      >
                        {defaultIcons[index % defaultIcons.length]}
                      </div>
                      <p className="menu_desc">
                        <Text
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: -20,
                            fontWeight: 'bold',
                          }}
                        >
                          {ModuleDescription}
                        </Text>
                      </p>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>

            <Modal
              title={childrenList?.[0]?.ModuleDescription}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width={'75%'}
              footer={null}
            >
              <Card bordered={false} className="dashboard_children">
                <Row gutter={[10, 10]} justify={'center'}>
                  {childrenList?.map((item: any, index: number) => (
                    <Col xxl={5} xl={6} lg={8} md={12} sm={24} xs={24} key={index}>
                      <Card hoverable className="children_cards">
                        <h3 className="chilren_route_heading1">
                          {item.IsFavorite ? (
                            <AntIcons.HeartFilled style={{ color: 'red' }} />
                          ) : (
                            <AntIcons.HeartOutlined />
                          )}
                        </h3>
                        <h3 className="chilren_route_heading" onClick={() => handleNavigate(item.RouteUrl)}>
                          {item.ScreenAlias}
                        </h3>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Modal>
          </Row>
        </Col>
      </Row>
    </>
  );
}
