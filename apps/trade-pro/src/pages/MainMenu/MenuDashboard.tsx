import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Modal, Button, Tabs, Radio, Space, Input } from 'antd';
import { HeartFilled, ExportOutlined, LayoutFilled, BankFilled, AudioOutlined } from '@ant-design/icons';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import type { RadioChangeEvent } from 'antd';

const { useToken } = theme;

type TabPosition = 'left' | 'right' | 'top' | 'bottom';

import { Layout, Menu, theme } from 'antd';
import HCards from './HCards';
import TabPane from 'antd/es/tabs/TabPane';
import File from './File';
import { useGetMenu } from '@tradePro/components/layout/queries';
import { groupBy, map, size } from 'lodash';
import { TSideMenu } from '@tradePro/components/layout/types';

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
  const { TabPane } = Tabs;
  return (
    <>
      <Row gutter={[24, 24]} style={{ border: '1px solid red' }}>
        <Col>
          <Row
            gutter={[16, 16]}
            justify={'space-evenly'}
            style={{
              border: `1px solid ${colorPrimary}`,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
          >
            <Col
              xs={24}
              sm={24}
              xl={24}
              xxl={24}
              md={24}
              style={{
                padding: '10px',
                backgroundColor: colorPrimary,
                borderTopRightRadius: 10,
                color: 'white',
                borderTopLeftRadius: 10,
              }}
            >
              <h2 style={{ fontFamily: 'Poppins' }}>
                APP MODULES{' '}
                <span style={{ marginLeft: '55%' }}>
                  <span className="btn-span">
                    <Button
                      className="btn-hover color-9"
                      style={{
                        textDecoration: 'none',
                        border: '1px solid #fff',
                        backgroundColor: '#fff',
                      }}
                    >
                      Screen_Wise
                    </Button>
                    <Button className="btn-hover color-9" style={{ textDecoration: 'none', border: '1px solid #fff' }}>
                      Module_Wise
                    </Button>
                  </span>
                  <Search placeholder="search" onSearch={onSearch} style={{ width: 200, marginLeft: '45px' }} />
                </span>
              </h2>
            </Col>
            {map(
              list,
              ({ ModuleDescription, ModuleTypeId, IconUrl }: TSideMenu & { children: TSideMenu[] }, index: number) => (
                <Card
                  hoverable
                  onClick={showModal}
                  className="container"
                  style={{
                    height: 160,
                    width: '13vw',

                    marginTop: '30px',
                    margin: '10px',
                    border: `1px solid ${colorPrimary}`,

                    marginLeft: 20,

                    marginBottom: 10,
                    boxShadow: 'inset: 20px 20px 2px ',
                  }}
                >
                  {' '}
                  <div
                    className=""
                    style={{
                      backgroundColor: colorPrimary,
                      color: '#fff',
                      fontSize: '17px',
                      fontWeight: 600,
                      height: 40,

                      borderRadius: '63% 37% 53% 47% / 0% 0% 100% 100% ',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 0,
                      position: 'absolute',
                      top: '0px',
                      left: '0px',
                      width: '100%',
                    }}
                  >
                    <Title level={4} style={{ color: '#fff', fontWeight: 700, margin: 5 }}>
                      {ModuleTypeId}
                    </Title>
                  </div>
                  <br></br>
                  <div
                    style={{
                      color: colorPrimary,
                      // backgroundColor: 'rgba(0,255,0,0.25)',
                      borderRadius: 20,
                      padding: 8,
                      margin: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem',
                    }}
                  >
                    {<LayoutFilled />}
                  </div>
                  <Text
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 0,
                    }}
                  >
                    {ModuleDescription}
                  </Text>
                </Card>
              )
            )}

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
