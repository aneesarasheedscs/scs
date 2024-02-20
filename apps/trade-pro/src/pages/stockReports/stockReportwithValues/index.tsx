import { useTranslation } from 'react-i18next';
import StockReportHistoryTable from './table';
import { Col, Row } from 'antd';
import { BackButton } from '@tradePro/components';
import './style.scss';

function StockReportswithValues() {
  const { t } = useTranslation();

  return (
    <div style={{ background: '#fff' }}>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={15} sm={10} md={12} lg={12} xl={20} xxl={16} className="">
          <h1 className="report_heading">{t('stock_report_with_values')}</h1>
        </Col>
        <Col xs={3} sm={2} xxl={1} md={2} lg={2} xl={2} style={{ marginRight: '50px' }}>
          <BackButton goToDashboard={false} />
        </Col>
      </Row>

      <StockReportHistoryTable />
    </div>
  );
}

export default StockReportswithValues;
