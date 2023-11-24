import React from 'react';
import { Card, Row, Col, Typography, theme } from 'antd';
import {
  DashboardOutlined,
  SettingOutlined,
  ExportOutlined,
  BankOutlined,
  TransactionOutlined,
  SlidersOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';

// import {Routes,Route} from 'react-router-dom';

const { Title, Text } = Typography;

const cardsData = [
  {
    key: 'dash-board',
    title: '3',
    icon: <DashboardOutlined />,
    description: 'Dashboard',
  },
  {
    key: 'admin-dashboard',
    title: '3',
    icon: <SettingOutlined />,
    description: 'Admin Dashboard',
  },
  {
    key: 'Export',
    title: '3',
    icon: <ExportOutlined />,
    description: 'Export',
  },
  {
    key: 'define-bank',
    title: '3',
    icon: <BankOutlined />,
    description: 'Define Bank',
  },
  {
    key: 'payment-vocher',
    title: '3',
    icon: <TransactionOutlined />,
    description: 'Payment Vocher',
  },
  {
    key: 'journal-vocher',
    title: '3',
    icon: <SlidersOutlined />,
    description: 'Journal Vocher',
  },
  {
    key: 'chart-of-account-report',
    title: '3',
    icon: <FileTextOutlined />,
    description: 'Chart of Account Report',
  },
];
const { useToken } = theme;
const HCards = () => {
  const navigate = useNavigate();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <div style={{ margin: '24px 16px 0' }}>
      <Link to="/adashboard">
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 0,
                    position: 'absolute',
                    top: '-15px',
                    right: '20px',
                    width: '100%',
                    left: '0px',
                    borderRadius: '51% 49% 100% 0% / 100% 100% 0% 0%  ',
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
      </Link>
    </div>
  );
};

export default HCards;
