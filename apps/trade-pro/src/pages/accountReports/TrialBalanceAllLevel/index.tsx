import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import TrialBalanceAllLevelReport from './trialBalanceAllLevel';
import { BackButton } from '@scs/ui';

function TrialBalance() {
  const { t } = useTranslation();
  return (
    <div style={{ background: '#fff' }}>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={10} sm={10} md={12} lg={8} xl={6} xxl={4} className="forms-heading-container">
          <h1 className="report_heading" style={{ textAlign: 'center' }}>
            {t('trial_balance_all_levels')}
          </h1>
        </Col>
        <Col xxl={1} style={{ marginRight: '49px' }}>
          <BackButton goToDashboard={false} />
        </Col>
      </Row>
      <TrialBalanceAllLevelReport />
    </div>
  );
}

export default TrialBalance;
