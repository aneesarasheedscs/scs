import { Card, Col, Row, Space, Tabs, Typography } from 'antd';
import {
  ExperimentOutlined,
  AccountBookOutlined,
  DollarOutlined,
  DashboardOutlined,
  SafetyCertificateOutlined,
  LineChartOutlined,
  BarChartOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './style.scss';
import { useGetMonthlySalesDashboard } from './queries';
import { map } from 'lodash';
import SaleByItemChart from './graph/SaleByItem';
import ParentCategoryChart from './graph/ParentCategory';
import SaleByDateChart from './graph/saleDateChart';
import SaleByBranchesChart from './graph/SaleByIBranches';
import MonthlySaleCriteria from './Criteriafilter';
import MonthlySaleReportCard, { SalesAvgCard, SalesMaxCard, SalesMinCard } from './SalesMonthlyCard';
import ParentCategoryTable, { SaleByDateTable, SaleByItemTable, SaleBybranchTable } from './table';
import SalesDashboardChart from './graph';
import { useState } from 'react';

// Default icons to be used if API data doesn't provide specific icons
const defaultIcons2 = [
  <LineChartOutlined
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
const cardBackgroundColors = ['rgba(0,255,0,0.5)', 'rgba(255,0,0,0.5)', 'rgba(0,0,255,0.5)'];
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

const MontlySaleReportDashbord = () => {
  const { data } = useGetMonthlySalesDashboard();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [activeTabforParent, setActiveTabforParent] = useState<string>('1');
  const [activeTabforItems, setActiveTabforItems] = useState<string>('1');
  const [activeTabforBranch, setActiveTabforBranch] = useState<string>('1');

  const filteredMonthlyTable = data?.data?.Data?.Result.Table.filter((item: any) => item.GroupId === 1);
  const filteredAvgSaleTable1 = data?.data?.Data?.Result.Table1.filter(
    (item: any) => item.CaptionTitle === 'Avg Sale By Day'
  );
  const filteredMaxSaleTable2 = data?.data?.Data?.Result.Table2.filter(
    (item: any) => item.CaptionTitle === 'Max Sale Day and Amount'
  );

  const filteredMinSaleTable3 = data?.data?.Data?.Result.Table3.filter(
    (item: any) => item.CaptionTitle === 'Min Sale Day and Amount'
  );

  // const filteredSaleDateTable4 = data?.data?.Data?.Result.Table4;

  const { t } = useTranslation();

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <MonthlySaleCriteria />
      <Row gutter={[10, 10]} style={{}}>
        <Col span={24} style={{ marginTop: '10px' }}>
          <Row gutter={6} justify={'center'} style={{}}>
            <Col
              xl={15}
              xxl={15}
              lg={23}
              md={23}
              sm={24}
              xs={24}
              style={{ marginBottom: '0.5%', borderRadius: 5, marginRight: '1%', boxShadow: '2px 2px 10px 0px gray' }}
            >
              <h2
                style={{
                  padding: '5px',
                  marginBottom: '7px',
                  textAlign: 'center',
                  borderBottom: '1px  solid lightgray',
                }}
              >
                {t('sales_by_payment_term')}
              </h2>
              <Row gutter={[10, 10]} justify={'space-between'}>
                <Col
                  xxl={14}
                  xl={24}
                  lg={24}
                  sm={24}
                  xs={24}
                  md={24}
                  style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row', flexWrap: 'wrap' }}
                >
                  {map(filteredMonthlyTable, (card: any, index: any) => (
                    <MonthlySaleReportCard
                      key={index}
                      desc={card.CaptionTitle}
                      Amount={card.TotalSale}
                      percentOfTotal={card['%OfTotal']}
                      backgroundColor={card.backgroundColor}
                      textColor={card.color}
                      icon={defaultIcons[index % defaultIcons.length]}
                    />
                  ))}
                </Col>

                <Col xxl={10} xl={24} lg={23} sm={24} xs={24} md={23} style={{ marginLeft: '0%' }}>
                  <Card
                    style={{ marginTop: '2%', marginRight: '0.8%', height: '92%' }}
                    hoverable
                    cover={
                      <>
                        <SalesDashboardChart data={data} />
                      </>
                    }
                  ></Card>
                </Col>
              </Row>
            </Col>

            <Col
              xl={8}
              xxl={8}
              lg={23}
              md={23}
              sm={24}
              xs={24}
              style={{ borderRadius: 5, marginRight: '0%', boxShadow: '2px 2px 10px 0px gray' }}
            >
              <h2
                style={{
                  padding: '5px',
                  marginBottom: '7px',
                  textAlign: 'center',
                  borderBottom: '1px  solid lightgray',
                }}
              >
                {t('sales_by_days')}
              </h2>
              <Row gutter={[10, 10]} style={{ border: ' ' }}>
                <Col>
                  {map(filteredAvgSaleTable1, (card: any, index: any) => (
                    <SalesAvgCard
                      key={index}
                      desc={card.CaptionTitle}
                      Amount={card.DayAvg}
                      percentOfTotal={card.PrcntOfTotalAmount}
                      backgroundColor={card.backgroundColor}
                      textColor={card.color}
                      icon={defaultIcons[index % defaultIcons.length]}
                    />
                  ))}
                </Col>
                <Col>
                  {map(filteredMaxSaleTable2, (card: any, index: any) => (
                    <SalesMaxCard
                      key={index}
                      desc={card.CaptionTitle}
                      Amount={card.MaxDaySale}
                      value={card.DocDate}
                      backgroundColor={card.backgroundColor}
                      textColor={card.color}
                      icon={defaultIcons[index % defaultIcons.length]}
                    />
                  ))}
                </Col>
                <Col>
                  {map(filteredMinSaleTable3, (card: any, index: any) => (
                    <SalesMinCard
                      key={index}
                      desc={card.CaptionTitle}
                      Amount={card.MinDaySale}
                      value={card.DocDate}
                      backgroundColor={card.backgroundColor}
                      textColor={card.color}
                      icon={defaultIcons[index % defaultIcons.length]}
                    />
                  ))}
                </Col>
              </Row>
            </Col>
          </Row>

          <Row gutter={10} justify={'center'} style={{ border: '', height: 'auto' }}>
            <Col
              xxl={12}
              xl={12}
              lg={23}
              md={23}
              xs={24}
              sm={24}
              style={{ marginTop: '1%', marginRight: '0.6%', borderRadius: 5, boxShadow: '2px 2px 10px 0px gray' }}
            >
              <h2
                style={{
                  padding: '5px',
                  marginBottom: '7px',
                  textAlign: 'center',
                  borderBottom: '1px  solid lightgray',
                }}
              >
                {t('sales_by_dates')}
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
                  <Col span={24} style={{ marginTop: '5px' }}>
                    <SaleByDateChart data={data} />
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
                  <Row
                    style={{
                      marginTop: '4%',
                      display: 'flex',
                      justifyContent: 'center',
                      height: '100%',
                    }}
                  >
                    <Col span={24}>
                      <SaleByDateTable data={data} />
                    </Col>
                  </Row>
                </Tabs.TabPane>
              </Tabs>
            </Col>
            <Col
              xxl={11}
              xl={11}
              lg={23}
              md={23}
              sm={24}
              xs={24}
              style={{ marginTop: '1%', marginRight: '0%', borderRadius: 5, boxShadow: '2px 2px 10px 0px gray' }}
            >
              <h2
                style={{
                  padding: '5px',
                  marginBottom: '7px',
                  textAlign: 'center',
                  borderBottom: '1px  solid lightgray',
                }}
              >
                {t('sales_by_parent_category')}
              </h2>
              <Tabs
                type="card"
                size="large"
                activeKey={activeTabforParent}
                className="tabs-margin-bottom-0"
                onChange={(key) => setActiveTabforParent(key)}
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
                  <Col span={24} style={{ marginTop: '5px' }}>
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
                  <Row style={{ marginTop: '4%', display: 'flex', height: '100%', justifyContent: 'center' }}>
                    <Col span={24}>
                      <ParentCategoryTable data={data} />
                    </Col>
                  </Row>
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
          <Row gutter={10} justify={'center'} style={{ border: '', height: 'auto' }}>
            <Col
              xxl={12}
              xl={12}
              lg={23}
              md={23}
              xs={24}
              sm={24}
              style={{ marginTop: '1%', marginRight: '0.6%', borderRadius: 5, boxShadow: '2px 2px 10px 0px gray' }}
            >
              <h2
                style={{
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
                activeKey={activeTabforItems}
                className="tabs-margin-bottom-0"
                onChange={(key) => setActiveTabforItems(key)}
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
                  <Col span={24} style={{ marginTop: '5px' }}>
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
                  <Row
                    style={{
                      marginTop: '4%',
                      display: 'flex',
                      justifyContent: 'center',
                      height: '100%',
                    }}
                  >
                    <Col span={24}>
                      <SaleByItemTable data={data} />
                    </Col>
                  </Row>
                </Tabs.TabPane>
              </Tabs>
            </Col>
            <Col
              xxl={11}
              xl={11}
              lg={23}
              md={23}
              xs={24}
              sm={24}
              style={{ marginTop: '1%', marginRight: '0%', borderRadius: 5, boxShadow: '2px 2px 10px 0px gray' }}
            >
              <h2
                style={{
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
                activeKey={activeTabforBranch}
                className="tabs-margin-bottom-0"
                onChange={(key) => setActiveTabforBranch(key)}
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
                  <Col span={24} style={{ marginTop: '5px' }}>
                    <SaleByBranchesChart data={data} />
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
                  <Row style={{ marginTop: '4%', display: 'flex', height: '100%', justifyContent: 'center' }}>
                    <Col span={24}>
                      <SaleBybranchTable data={data} />
                    </Col>
                  </Row>
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default MontlySaleReportDashbord;
