import { Col, Row, Space, Typography, Form, Card, Tabs } from 'antd';
import {
  ExperimentOutlined,
  AccountBookOutlined,
  DollarOutlined,
  DashboardOutlined,
  SafetyCertificateOutlined,
  LineChartOutlined,
  TableOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './style.scss';
import SalesAnalyticalCriteria from './Criteriafilter';
import SalesDashboardCard, { SalesPaymentCard } from './SalesCard';

import SalesDashboardChart from './graph';
import { usePostSalesAnalyticsDashboard } from './queries';
import { map } from 'lodash';
import SaleByItemChart from './graph/SaleByBranch';

import ParentCategoryChart from './graph/ParentCategory';
import SaleByBranchChart2 from './graph/SaleByBranch copy';
import ParentCategoryTable, { SaleByItemTable, SaleBybranchTable } from './table';
import { TSalesDashboardCriteria } from './types';
import MyChartComponent from './graph/MyGraphComponent';
import { useState } from 'react';

// Default icons to be used if API data doesn't provide specific icons
const defaultIcons2 = [
  <LineChartOutlined
    className=""
    style={{
      color: '#fff',
      backgroundColor: 'rgba(33, 189, 175, 0.8)',
      borderRadius: 20,
      fontSize: 30,
      padding: 8,
      outline: '2px solid #fff',
    }}
  />,
  <AccountBookOutlined
    style={{
      color: '#fff',
      backgroundColor: 'rgba(250, 194, 167, 0.47)',
      borderRadius: 20,
      fontSize: 30,
      padding: 8,
      outline: '2px solid #fff',
    }}
  />,
  <DashboardOutlined
    style={{
      color: '#fff',
      backgroundColor: 'rgba(190, 222, 20, 0.68)',
      borderRadius: 20,
      fontSize: 30,
      padding: 8,
      outline: '2px solid #fff',
    }}
  />,
];
const cardBackgroundColors = [
  'lightblue',
  'rgba(0,255,0,0.5)',
  'rgba(255,0,0,0.5)',
  'rgba(0,0,255,0.5)',
  '#FFAF0C',

  // Add more colors as needed
];
const defaultIcons = [
  <ExperimentOutlined
    style={{
      color: '#fff',
      backgroundColor: 'rgba(0,255,0,0.5)',
      borderRadius: 20,
      fontSize: 30,
      padding: 8,
      outline: '2px solid #fff',
    }}
  />,
  <AccountBookOutlined
    style={{
      color: '#fff',
      backgroundColor: 'rgba(255,0,0,0.5)',
      borderRadius: 20,
      fontSize: 30,
      padding: 8,
      outline: '2px solid #fff',
    }}
  />,
  <DashboardOutlined
    style={{
      color: '#fff',
      backgroundColor: 'rgba(0,0,255,0.5)',
      borderRadius: 20,
      fontSize: 30,
      padding: 8,
      outline: '2px solid #fff',
    }}
  />,
  <DollarOutlined
    style={{
      color: '#fff',
      backgroundColor: 'rgba(255,0,500,0.5)',
      borderRadius: 20,
      fontSize: 30,
      padding: 8,
      outline: '2px solid #fff',
    }}
  />,
  <SafetyCertificateOutlined
    style={{
      color: '#fff',
      backgroundColor: 'rgba(0,200,500,0.5)',
      borderRadius: 20,
      fontSize: 30,
      padding: 8,
      outline: '2px solid #fff',
    }}
  />,
];

const { useForm, useWatch } = Form;

const SalesDashboard = () => {
  const [form] = useForm<TSalesDashboardCriteria>();
  const formValues = useWatch<TSalesDashboardCriteria>([], form);
  const { data, refetch } = usePostSalesAnalyticsDashboard(true, [form.getFieldsValue()]);
  const [activeTab, setActiveTab] = useState<string>('1');
  const [activeTab2, setActiveTab2] = useState<string>('1');
  const [activeTab3, setActiveTab3] = useState<string>('1');

  const filteredCurrentStatics = data?.data?.Data?.Result.Table.filter((item: any) => item.GroupId === 0);
  const filteredCurrentStaticsToday = data?.data?.Data?.Result.Table.filter(
    (item: any) => item.DescriptionTitle === 'Today'
  );
  const filteredCurrentStaticsWeek = data?.data?.Data?.Result.Table.filter(
    (item: any) => item.DescriptionTitle === 'This Week'
  );
  const filteredCurrentStaticsMonth = data?.data?.Data?.Result.Table.filter(
    (item: any) => item.DescriptionTitle === 'This Month'
  );
  const filteredCurrentStaticsQuartly = data?.data?.Data?.Result.Table.filter(
    (item: any) => item.DescriptionTitle === 'This Quarter'
  );
  const filteredCurrentStaticsYear = data?.data?.Data?.Result.Table.filter(
    (item: any) => item.DescriptionTitle === 'This Year'
  );
  const filteredSalesPaymentTerms = data?.data?.Data?.Result.Table1.filter((item: any) => item.GroupId === 1);
  const formHeading = {
    fontFamily: 'Times New Roman',
    borderRadius: '5px',
    padding: '5px',
    boxShadow: '2px 4px 12px 1px lightgray',
    marginBottom: '7px',
    fontSize: '1.3rem',
  };
  const defaultGraphs = [
    <MyChartComponent
      filteredCurrentStaticsforTitles={filteredCurrentStaticsToday}
      cardBackgroundColors={cardBackgroundColors?.[0]}
    />,
    <MyChartComponent
      filteredCurrentStaticsforTitles={filteredCurrentStaticsWeek}
      cardBackgroundColors={cardBackgroundColors?.[1]}
    />,
    <MyChartComponent
      filteredCurrentStaticsforTitles={filteredCurrentStaticsMonth}
      cardBackgroundColors={cardBackgroundColors?.[2]}
    />,
    <MyChartComponent
      filteredCurrentStaticsforTitles={filteredCurrentStaticsQuartly}
      cardBackgroundColors={cardBackgroundColors?.[3]}
    />,
    <MyChartComponent
      filteredCurrentStaticsforTitles={filteredCurrentStaticsYear}
      cardBackgroundColors={cardBackgroundColors?.[4]}
    />,
  ];

  const { t } = useTranslation();

  return (
    <div style={{ backgroundColor: '#fff' }} className="scrollable-container">
      <Row gutter={[10, 10]} style={{}}>
        <Col xl={24} xs={24} sm={23} md={24} lg={23} xxl={24}>
          <SalesAnalyticalCriteria refetch={refetch} form={form} />
          <Row gutter={[20, 4]} style={{ marginLeft: 3 }} justify={'space-evenly'}>
            <Col
              xl={6}
              xs={24}
              sm={23}
              md={10}
              lg={23}
              xxl={5}
              style={{
                marginTop: '10px',
                borderRadius: '5px',
                height: '100%',
                boxShadow: '2px 2px 10px 0px gray',
                paddingBottom: '2%',
              }}
            >
              <h2
                style={{
                  padding: '5px',
                  // boxShadow: '2px 4px 12px 1px lightgray',
                  marginBottom: '15px',
                  textAlign: 'center',
                  // color: 'blueviolet',
                  borderBottom: '1px  solid lightgray',
                }}
              >
                {t('current_statistics')}
              </h2>

              <Space direction="vertical" style={{ border: '', width: '100%' }}>
                {map(filteredCurrentStatics, (card: any, index: any) => (
                  <SalesDashboardCard
                    key={index}
                    title={card.StartDate}
                    value={card.EndDate}
                    desc={card.DescriptionTitle}
                    Amount={card.NetAmount}
                    backgroundColor={cardBackgroundColors[index % cardBackgroundColors.length]}
                    icon={defaultIcons[index % defaultIcons2.length]}
                    chart={defaultGraphs[index % defaultGraphs.length]}
                  />
                ))}
              </Space>
            </Col>
            <Col
              xl={18}
              xs={24}
              sm={23}
              md={13}
              lg={23}
              xxl={18}
              style={{
                marginTop: '10px',
                // border: '1px solid red',
                borderRadius: '5px',
                // boxShadow: '2px 4px 12px 1px lightgray',
                // boxShadow: '2px 2px 10px 0px gray',
              }}
            >
              <Card
                style={{ marginBottom: '1.5%', boxShadow: '2px 2px 10px 0px gray' }}
                cover={
                  <>
                    <h2
                      style={{
                        padding: '5px',
                        marginBottom: '7px',
                        textAlign: 'center',
                        borderBottom: '1px  solid lightgray',
                      }}
                    >
                      {t('sales_payment_term')}
                    </h2>{' '}
                    <Row style={{ display: 'flex' }} justify={'space-between'}>
                      <Col xl={18} xs={24} sm={23} md={24} lg={23} xxl={12}>
                        <Space direction="horizontal" className="space-vertical">
                          {map(filteredSalesPaymentTerms, (card: any, index: any) => (
                            <SalesPaymentCard
                              key={index}
                              desc={card.DescriptionTitle}
                              Amount={card.NetAmount}
                              percentOfTotal={card.PrcntOfTotalAmount}
                              backgroundColor={card.backgroundColor}
                              textColor={card.color}
                              icon={defaultIcons[index % defaultIcons.length]}
                            />
                          ))}{' '}
                        </Space>
                      </Col>

                      <Col
                        xl={18}
                        xs={23}
                        sm={23}
                        md={24}
                        lg={23}
                        xxl={10}
                        style={{ marginTop: '15px', marginRight: '1%' }}
                      >
                        <Card style={{ boxShadow: '2px 2px 10px 0px gray' }}>
                          <SalesDashboardChart data={data} />
                        </Card>
                      </Col>
                    </Row>
                  </>
                }
              ></Card>
              <Card
                style={{ marginBottom: '1.5%', boxShadow: '2px 2px 10px 0px gray' }}
                cover={
                  <>
                    <h2
                      style={{
                        borderRadius: '5px',
                        padding: '5px',
                        marginBottom: '7px',
                        textAlign: 'center',
                        borderBottom: '1px  solid lightgray',
                      }}
                    >
                      {t('parent_category')}
                    </h2>
                    <Tabs
                      type="card"
                      size="large"
                      activeKey={activeTab2}
                      className="tabs-margin-bottom-0"
                      onChange={(key) => setActiveTab2(key)}
                    >
                      <Tabs.TabPane
                        key="1"
                        tab={
                          <b>
                            <BarChartOutlined />
                            {t('graph_view')}
                          </b>
                        }
                      >
                        <Col xxl={22} xl={24} md={24} xs={24} style={{ marginTop: '5px' }}>
                          <ParentCategoryChart data={data} />
                        </Col>
                      </Tabs.TabPane>
                      <Tabs.TabPane
                        key="2"
                        tab={
                          <b>
                            <TableOutlined />
                            {t('grid_view')}
                          </b>
                        }
                      >
                        <Row style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                          <Col xxl={20} xl={16} md={24} xs={24}>
                            <ParentCategoryTable data={data} />
                          </Col>
                        </Row>
                      </Tabs.TabPane>
                    </Tabs>
                  </>
                }
              ></Card>
              <Card
                style={{ marginBottom: '1.5%', paddingLeft: 5, boxShadow: '2px 2px 10px 0px gray' }}
                cover={
                  <>
                    <h2
                      style={{
                        borderRadius: '5px',
                        padding: '5px',
                        marginBottom: '7px',
                        textAlign: 'center',
                        borderBottom: '1px  solid lightgray',
                      }}
                    >
                      {t('sales_by_items')}
                    </h2>
                    <Tabs
                      type="card"
                      size="large"
                      activeKey={activeTab}
                      className="tabs-margin-bottom-0"
                      onChange={(key) => setActiveTab(key)}
                    >
                      <Tabs.TabPane
                        key="1"
                        tab={
                          <b>
                            <BarChartOutlined />
                            {t('graph_view')}
                          </b>
                        }
                      >
                        <Col xxl={22} xl={24} md={24} xs={24} style={{ marginTop: '-5px' }}>
                          <SaleByItemChart data={data} />
                        </Col>
                      </Tabs.TabPane>
                      <Tabs.TabPane
                        key="2"
                        tab={
                          <b>
                            <TableOutlined />
                            {t('grid_view')}
                          </b>
                        }
                      >
                        <Row style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                          <Col xxl={20} xl={16} md={24} xs={24}>
                            <SaleByItemTable data={data} />
                          </Col>
                        </Row>
                      </Tabs.TabPane>
                    </Tabs>
                  </>
                }
              ></Card>

              <Card
                hoverable
                style={{ marginBottom: '1.5%', boxShadow: '2px 2px 10px 0px gray' }}
                cover={
                  <>
                    <h2
                      style={{
                        borderRadius: '5px',
                        padding: '5px',
                        marginBottom: '7px',
                        textAlign: 'center',
                        borderBottom: '1px  solid lightgray',
                      }}
                    >
                      {t('sales_by_branch')}
                    </h2>
                    <Tabs
                      type="card"
                      size="large"
                      activeKey={activeTab3}
                      className="tabs-margin-bottom-0"
                      onChange={(key) => setActiveTab3(key)}
                    >
                      <Tabs.TabPane
                        key="1"
                        tab={
                          <b>
                            <BarChartOutlined />
                            {t('graph_view')}
                          </b>
                        }
                      >
                        <Col xxl={22} xl={24} md={24} xs={24} style={{ marginTop: '-5px' }}>
                          <SaleByBranchChart2 data={data} />
                        </Col>
                      </Tabs.TabPane>
                      <Tabs.TabPane
                        key="2"
                        tab={
                          <b>
                            <TableOutlined />
                            {t('grid_view')}
                          </b>
                        }
                      >
                        <Row style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                          <Col xxl={20} xl={16} md={24} xs={24}>
                            <SaleBybranchTable data={data} />
                          </Col>
                        </Row>
                      </Tabs.TabPane>
                    </Tabs>
                  </>
                }
              ></Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SalesDashboard;
