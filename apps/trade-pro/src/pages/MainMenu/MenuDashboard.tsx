import React, { useEffect, useState, useTransition } from 'react';
import { Card, Row, Col, Typography, Modal, Button, Tabs, Radio, Space, Input } from 'antd';
import { HeartFilled, ExportOutlined, LayoutFilled, BankFilled, AudioOutlined } from '@ant-design/icons';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import type { RadioChangeEvent } from 'antd';
import {
  ExperimentOutlined,
  AccountBookOutlined,
  DollarOutlined,
  DashboardOutlined,
  SafetyCertificateOutlined,
  TransactionOutlined,
  FileDoneOutlined,
  ShoppingOutlined,
  LineChartOutlined,
  FileTextOutlined,
  ShopOutlined,
  AppstoreOutlined,
  FileOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { useToken } = theme;

type TabPosition = 'left' | 'right' | 'top' | 'bottom';

import { Layout, Menu, theme } from 'antd';
import HCards from './HCards';
import TabPane from 'antd/es/tabs/TabPane';
import File from './File';
import { useGetMenu } from '@tradePro/components/layout/queries';
import { groupBy, map, size } from 'lodash';
import { TSideMenu } from '@tradePro/components/layout/types';
import { useTranslation } from 'react-i18next';
import { AntButton } from '@tradePro/components';

const { Header, Content, Footer, Sider } = Layout;

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);

const onSearch = (value: string) => console.log(value);

const { Title, Text } = Typography;

export default function MenuDashboard() {
  const [tabPosition, setTabPosition] = useState<TabPosition>('left');
  const { data: Menu, isError: isMenu, isLoading: isLoadingMenu, isSuccess } = useGetMenu();
  const { t } = useTranslation();

  const changeTabPosition = (e: RadioChangeEvent) => {
    setTabPosition(e.target.value);
  };

  const navigate = useNavigate();

  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [list, setList] = useState<any>([]);
  const { pathname } = useLocation();
  useEffect(() => {
    if (isSuccess) {
      setList(menuList2(Menu?.data?.Data?.Result));
    }
  }, [Menu, isSuccess]);
  const menuList2 = (data: any[]) => {
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

  const childrenLengths = map(list, (item) => item.children.length);

  // Now 'childrenLengths' contains the lengths of the 'children' arrays for each item in the 'list' array
  console.log('chi', childrenLengths);

  console.log(list?.[0]?.children.length);

  const { TabPane } = Tabs;
  const defaultIcons = [
    <DashboardOutlined />,
    <AccountBookOutlined />,
    <TransactionOutlined />,
    <FileDoneOutlined />,
    <ShoppingOutlined />,
    <FileTextOutlined />,
    <ShopOutlined />,
    <FileOutlined />,
    <AppstoreOutlined />,
    <FileTextOutlined />,
    <FileTextOutlined />,

    <AppstoreOutlined />,
    <DollarOutlined />,
    <SettingOutlined />,
  ];

  return (
    <>
      <Row gutter={[24, 24]} >
        <Col>
          <Row
            gutter={[10, 10]}
            style={{
              border: `1px solid ${colorPrimary}`,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              width: '100%',
            }}
          >
            <Col
              xs={24}
              sm={24}
              md={24}
              xl={24}
              xxl={24}
              className="formHeading"
              style={{ backgroundColor: colorPrimary }}
            >
              <Row gutter={[16, 16]}>
                <Col xxl={24} xs={24} xl={24} md={24} className="headerstyle" style={{}}>
                  <Col xxl={13} xl={10} md={5} className="module-heading">
                    <h2>{t('app_modules')}</h2>
                  </Col>
                  {/* <Row gutter={[16, 16]} justify={'space-evenly'}>
                    <Col xxl={7} xl={11} className="">
                      <AntButton className="btn-hover color-9" label={t('module_wise')} />
                    </Col>
                    <Col xxl={4} xl={12} className="">
                      <AntButton
                        className="btn-hover color-9"
                        label={t('module_wise')}
                        style={{ textDecoration: 'none', border: '1px solid #fff' }}
                      />
                    </Col>
                  </Row> */}

                  <Col xxl={4} xl={6} className="menu-search-bar">
                    <p className="searchBarSize">
                      <Search placeholder="search" onSearch={onSearch} style={{ width: 200 }} />
                    </p>
                  </Col>
                </Col>
              </Row>
            </Col>
            <Col xxl={24} xs={23} sm={23} md={24} lg={24} xl={24} style={{ marginLeft: '-1%' }}>
              <Row justify={'center'} gutter={10} style={{ marginLeft: '' }}>
                {map(list, ({ ModuleDescription }: TSideMenu & { children: TSideMenu[] }, index: number) => (
                  <Col xs={24} xxl={4} sm={12} md={11} lg={6}>
                    <Card
                      hoverable
                      onClick={showModal}
                      className="container_menuCard"
                      style={{
                        border: `1px solid ${colorPrimary}`,
                      }}
                    >
                      {' '}
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
                          // backgroundColor: 'rgba(0,255,0,0.25)',
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
              title="Dashboards"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width={'75%'}
              footer={null}
            >
              <Tabs style={{ height: '65vh' }} tabPosition={tabPosition}>
                <TabPane tab="" style={{}}>
                  <h1
                    style={{
                      color: colorPrimary,
                      fontSize: '3rem',
                      // background: '#333333',
                      textAlign: 'center',
                      textShadow: '2px 2px 0 #bcbcbc, 4px 4px 0 #9c9c9c',
                    }}
                  >
                    Welcome to this EccountBook Cloud ERP Dashboards
                  </h1>
                </TabPane>

                <TabPane
                  tab={
                    <Card className="side-cards" style={{ color: colorPrimary }}>
                      <HeartFilled />
                      Account
                    </Card>
                  }
                  key="1"
                >
                  <HCards />
                </TabPane>
                <TabPane
                  tab={
                    <Card className="side-cards" style={{ color: colorPrimary }}>
                      <LayoutFilled />
                      Sales
                    </Card>
                  }
                  key="2"
                >
                  <File />
                </TabPane>
                <TabPane
                  tab={
                    <Card className="side-cards" style={{ color: colorPrimary }}>
                      <BankFilled />
                      Oranizations
                    </Card>
                  }
                  key="3"
                >
                  <HCards />
                </TabPane>

                <TabPane
                  tab={
                    <Card className="side-cards" style={{ color: colorPrimary }}>
                      <ExportOutlined />
                      Export
                    </Card>
                  }
                  key="4"
                >
                  <File />
                </TabPane>
              </Tabs>
            </Modal>
          </Row>
        </Col>
      </Row>
      {/* <h1 style={{textAlign:'center',fontSize:'35px'}}> ∈ccountBook <sup>Cloud ERP</sup></h1> */}
    </>
  );
}
