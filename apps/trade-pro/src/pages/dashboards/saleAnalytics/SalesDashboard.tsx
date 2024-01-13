import { Col, Row, Space, Typography, Form } from 'antd';
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

const { useForm, useWatch } = Form;

const SalesDashboard = () => {
  const [form] = useForm<TSalesDashboardCriteria>();
  const formValues = useWatch<TSalesDashboardCriteria>([], form);
  const { data, refetch } = usePostSalesAnalyticsDashboard(true, [form.getFieldsValue()]);

  const filteredCurrentStatics = data?.data?.Data?.Result.Table.filter((item: any) => item.GroupId === 0);
  const filteredSalesPaymentTerms = data?.data?.Data?.Result.Table1.filter((item: any) => item.GroupId === 1);
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
    <div style={{ backgroundColor: '#fff' }} className="scrollable-container">
      <Row gutter={[24, 24]}>
        <Col xl={24} xs={24} sm={23} md={24} lg={23} xxl={24}>
          <Typography.Title level={2} style={formHeading}>
            {t('sales_analytical_dashboard')}
          </Typography.Title>
          <SalesAnalyticalCriteria refetch={refetch} form={form} />
          <Row gutter={[24, 24]}>
            <Col xl={6} xs={24} sm={23} md={10} lg={23} xxl={4} style={{ marginTop: '10px' }}>
              <Typography.Title
                level={4}
                style={{
                  fontFamily: 'Times New Roman',
                  borderRadius: '5px',
                  padding: '5px',
                  boxShadow: '2px 4px 12px 1px lightgray',
                  marginBottom: '7px',
                  fontSize: '1.3rem',
                  textAlign: 'center',
                  color: 'blueviolet',
                }}
              >
                {t('current_statistics')}
              </Typography.Title>

              <Space direction="vertical">
                {map(filteredCurrentStatics, (card: any, index: any) => (
                  <SalesDashboardCard
                    key={index}
                    title={card.StartDate}
                    value={card.EndDate}
                    desc={card.DescriptionTitle}
                    Amount={card.NetAmount}
                    backgroundColor={cardBackgroundColors[index % cardBackgroundColors.length]}
                    icon={defaultIcons[index % defaultIcons2.length]}
                  />
                ))}
              </Space>
            </Col>

            <Col xl={18} xs={24} sm={23} md={13} lg={23} xxl={20} style={{ marginTop: '10px' }}>
              <Typography.Title
                level={4}
                style={{
                  fontFamily: 'Times New Roman',
                  borderRadius: '5px',
                  padding: '5px',
                  boxShadow: '2px 4px 12px 1px lightgray',
                  marginBottom: '7px',
                  fontSize: '1.3rem',
                  textAlign: 'center',
                  color: 'green',
                }}
              >
                {t('sales_payment_term')}
              </Typography.Title>
              <Row>
                <Col xl={18} xs={24} sm={23} md={24} lg={23} xxl={12}>
                  {' '}
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
                  xxl={5}
                  style={{ marginTop: '15px', marginBottom: '15px' }}
                >
                  <SalesDashboardChart data={data} />
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
                  marginTop: '-4%',
                  textAlign: 'center',
                  color: 'blue',
                }}
              >
                {t('parent_category')}
              </Typography.Title>

              <Row gutter={[24, 24]}>
                <Col xl={18} xs={23} sm={23} md={24} lg={23} xxl={12} style={{ marginTop: '-5px' }}>
                  <ParentCategoryChart data={data} />
                </Col>
                <Col
                  xl={{ span: 18, offset: 1 }}
                  xs={23}
                  sm={23}
                  md={24}
                  lg={23}
                  xxl={10}
                  style={{ marginTop: '30px' }}
                >
                  <ParentCategoryTable data={data} />
                </Col>
                <Col style={{ marginTop: '-30px' }}></Col>
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
                  marginTop: '-4%',
                  textAlign: 'center',
                  color: 'blue',
                }}
              >
                {t('sales_by_items')}
              </Typography.Title>
              <Row justify={'center'}>
                <Col xxl={22} xl={24} md={24} xs={24} style={{ marginTop: '-10px' }}>
                  <SaleByItemChart data={data} />
                </Col>
                <Col xxl={18} xl={16} md={24} xs={24} style={{ marginTop: '20px' }}>
                  <SaleByItemTable data={data} />
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
                {t('sales-by-branch')}
              </Typography.Title>
              <Row>
                <Col xl={11} xxl={9} xs={24} lg={24} md={24} style={{ marginTop: '0px' }}>
                  <SaleByBranchChart2 data={data} />
                </Col>
                <Col xl={14} xxl={14} xs={24} lg={24} md={24} style={{ marginTop: '7%' }}>
                  <SaleBybranchTable data={data} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SalesDashboard;
