import { Col, Row, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import AccountHistoryTable from './table';

import ChartAccountForm from './form';

function ChartOfAccount() {
  const { t } = useTranslation();
  return (
    <>
      <Row gutter={6} style={{ background: '#fff' }}>
        <Col span={24}>
          <h2 className="form-heading"> {t('chart_of_account')} </h2>
          <Tabs
            type="card"
            size="large"
            defaultActiveKey="1"
            className="tabs-margin-bottom-0"
            items={[
              { key: '1', label: t('history'), children: <AccountHistoryTable /> },
              { key: '2', label: t('form'), children: <ChartAccountForm /> },
            ]}
          />
        </Col>
      </Row>
    </>
  );
}

export default ChartOfAccount;
