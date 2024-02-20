import { Card, Col, Row, theme } from 'antd';
import StockReportSimpleTable from '../stockReportSimple/table';
import { useTranslation } from 'react-i18next';
import { BackButton } from '@tradePro/components';

function StockReportSimple() {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const { t } = useTranslation();
  const formHeading = {
    fontFamily: 'Times New Roman',
    borderRadius: '5px',
    padding: '5px',
    boxShadow: '2px 4px 12px 1px gray',
    marginBottom: '7px',
    fontSize: '1.8rem',
  };
  return (
    <div style={{ background: '#fff' }}>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={10} sm={10} md={12} lg={12} xl={12} xxl={16} className="">
          <h1 className="report_heading">{t('stock_report')}</h1>
        </Col>
        <Col xs={3} sm={2} xxl={1} md={2} lg={2} xl={2} style={{ marginRight: '50px' }}>
          <BackButton goToDashboard={false} />
        </Col>
      </Row>
      <StockReportSimpleTable />
    </div>
  );
}

export default StockReportSimple;
