import { Col, Row, Space, Typography } from 'antd';
import {
  ExperimentOutlined,
  AccountBookOutlined,
  DollarOutlined,
  DashboardOutlined,
  SafetyCertificateOutlined,
  LineChartOutlined,
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
const cardBackgroundColors = [
  'rgba(0,255,0,0.5)',
  'rgba(255,0,0,0.5)',
  'rgba(0,0,255,0.5)',

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

const MontlySaleReportDashbord = () => {
  const { data } = useGetMonthlySalesDashboard();

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

  const filteredSaleDateTable4 = data?.data?.Data?.Result.Table4;

  const formHeading = {
    fontFamily: 'Times New Roman',
    borderRadius: '5px',
    padding: '5px',
    boxShadow: '2px 4px 12px 1px lightgray',
    marginBottom: '7px',
    fontSize: '1.3rem',
  };

  const { t } = useTranslation();

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Typography.Title level={2} style={formHeading}>
        {t('monthly_sale_report')}
      </Typography.Title>
      <MonthlySaleCriteria />
      <Row gutter={[24, 24]}>
        <Col xxl={24} xl={24} xs={24} style={{ marginTop: '10px' }}>
          <Row>
            <Col xl={12} xxl={9} xs={24}>
              <Space direction="horizontal" className="space-vertical">
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
              </Space>
            </Col>
            <Col xxl={5} xl={5} xs={24} md={23} style={{ marginLeft: '3%' }}>
              {' '}
              <SalesDashboardChart data={data} />
            </Col>
            <Col xl={4} xxl={4} xs={24}>
              <Space direction="horizontal">
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
              </Space>
            </Col>
          </Row>

          <Row>
            <Col xxl={12} xs={23} style={{ marginTop: '1%' }}>
              <ParentCategoryChart />
            </Col>
            <Col xxl={11} xs={23} style={{ marginTop: '1%' }}>
              <ParentCategoryTable />
            </Col>
          </Row>

          <Typography.Title
            level={4}
            style={{
              fontFamily: 'Times New Roman',
              borderRadius: '5px',
              padding: '5px',
              // boxShadow: '2px 4px 12px 1px lightgray',
              marginBottom: '7px',
              fontSize: '1.3rem',
              marginTop: '2%',
              textAlign: 'center',
              color: 'crimson',
            }}
          >
            {t('sale_date')}
          </Typography.Title>
          <Row justify={'center'}>
            <Col xl={20} xxl={20} xs={23} style={{ marginTop: '-10px' }}>
              <SaleByDateChart />
            </Col>
            <Col xl={9} xxl={9} xs={23} style={{ marginTop: '20px' }}>
              <SaleByDateTable />
            </Col>
          </Row>

          <Typography.Title
            level={4}
            style={{
              fontFamily: 'Times New Roman',
              borderRadius: '5px',
              padding: '5px',
              // boxShadow: '2px 4px 12px 1px lightgray',
              marginBottom: '7px',
              fontSize: '1.3rem',
              marginTop: '2%',
              textAlign: 'center',
              color: 'blue',
            }}
          >
            {t('sales_by_items')}
          </Typography.Title>
          <Row>
            <Col xl={12} xxl={12} xs={23} style={{ marginTop: '-10px' }}>
              <SaleByItemChart />
            </Col>
            <Col xl={12} xxl={11} xs={23} style={{ marginTop: '20px' }}>
              <SaleByItemTable />
            </Col>
          </Row>

          <Typography.Title
            level={4}
            style={{
              fontFamily: 'Times New Roman',
              borderRadius: '5px',
              padding: '5px',
              // boxShadow: '2px 4px 12px 1px lightgray',
              marginBottom: '7px',
              fontSize: '1.3rem',
              marginTop: '20px',
              textAlign: 'center',
              color: 'purple',
            }}
          >
            {t('sales_by_branch')}
          </Typography.Title>
          <Row>
            <Col xl={11} xxl={11} xs={23} style={{ marginTop: '20px' }}>
              <SaleByBranchesChart />
            </Col>
            <Col xl={13} xxl={13} xs={23} style={{ marginTop: '7%' }}>
              <SaleBybranchTable />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default MontlySaleReportDashbord;
