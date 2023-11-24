import React from 'react';
import { Card, Row, Col, Typography, Modal, Button, Tabs, theme } from 'antd';
import {
  DashboardOutlined,
  SettingOutlined,
  ExportOutlined,
  BankOutlined,
  TransactionOutlined,
  SlidersOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Routes, Route, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const cardsData = [
  {
    title: '3',
    icon: <DashboardOutlined />,
    description: 'Dashboard',
  },
  {
    title: '3',
    icon: <SettingOutlined />,
    description: 'Admin Dashboard',
  },
  {
    title: '3',
    icon: <ExportOutlined />,
    description: 'Export',
  },
  {
    title: '3',
    icon: <BankOutlined />,
    description: 'Define Bank',
  },
  {
    title: '3',
    icon: <TransactionOutlined />,
    description: 'Payment Vocher',
  },
  {
    title: '3',
    icon: <SlidersOutlined />,
    description: 'Journal Vocher',
  },
  {
    title: '3',
    icon: <FileTextOutlined />,
    description: 'Chart of Account Report',
  },

  {
    title: '3',
    icon: <FileTextOutlined />,
    description: 'Chart of Account Report',
  },

  {
    title: '3',
    icon: <FileTextOutlined />,
    description: 'Chart of Account Report',
  },
  {
    title: '3',
    icon: <FileTextOutlined />,
    description: 'Chart of Account Report',
  },
];
const { useToken } = theme;
const File = () => {
  const navigate = useNavigate();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <div style={{ margin: '24px 16px 0' }}>
      <Row gutter={[8, 16]} justify="center">
        {cardsData.map((card, index) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={5} key={index}>
            <Card
              hoverable
              className="move"
              style={{
                // width: '90%',
                height: 100,
                width: '10vw',
                margin: '30px',
                // border: '1px solid #00a8ff',
                marginLeft: 15,
                marginRight: 20,
                marginBottom: 10,
                // boxShadow: '  rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                // boxShadow: 'rgba(240, 46, 170, 0.4) 0px 5px, rgba(240, 46, 170, 0.3) 0px 10px, rgba(240, 46, 170, 0.2) 0px 15px, rgba(240, 46, 170, 0.1) 0px 20px, rgba(240, 46, 170, 0.05) 0px 25px',
              }}
            >
              <div
                style={{
                  backgroundColor: colorPrimary,
                  color: '#fff',
                  fontSize: '17px',
                  fontWeight: 600,
                  height: 45,
                  // borderTopRightRadius: 6,
                  // borderTopLeftRadius: 6,
                  borderRadius: '80%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 0,
                  position: 'absolute',
                  top: '-15px',
                  right: '20px',
                  width: '100%',
                  left: '0px',
                  // borderRadius: '51% 49% 100% 0% / 100% 100% 0% 0%  ',
                  textAlign: 'center',
                }}
              >
                <Title
                  level={4}
                  style={{
                    color: '#fff',
                    // backgroundColor: 'rgba(0,255,0,0.25)',
                    borderRadius: 20,
                    padding: 8,
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}
                >
                  {card.icon}
                </Title>
              </div>

              <br></br>

              <Text
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 0,
                }}
              >
                {card.description}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default File;
