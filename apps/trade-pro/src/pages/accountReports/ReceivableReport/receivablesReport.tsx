import { Col, Row, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import FollowUp from './FollowUp';
import ReceivableReportTable from './receivableTable';
import { BackButton } from '@tradePro/components';

const ReceivableReport = () => {
  const { t } = useTranslation();
  return (
    <div style={{ background: '#fff' }}>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={13} sm={10} md={12} lg={8} xl={7} xxl={4} className="forms-heading-container">
          <h1 className="report_heading" style={{ textAlign: 'center' }}>
            {t('receivables_report')}
          </h1>
        </Col>
        <Col xs={3} xxl={1} lg={2} style={{ marginRight: '50px' }}>
          {' '}
          <BackButton goToDashboard={false} />
        </Col>
      </Row>
      <Row justify={'space-around'}>
        <Col xs={22} xxl={23}>
          <Tabs type="card" size="large" className="tabs-margin-bottom-0">
            <Tabs.TabPane key="1" tab={t('form')}>
              <ReceivableReportTable />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab={t('follow_up')}>
              <FollowUp />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default ReceivableReport;
