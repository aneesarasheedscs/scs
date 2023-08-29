import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import AccountHistoryTable from './table';
import Chart_form from '../CHART/chart_of_account/chart_of_account_form';
import ChartAccountForm from './form';

function ChartOfAccount() {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="form-heading"> Chart Of Account</h2>
      <Tabs
        type="card"
        size="large"
        defaultActiveKey="1"
        className="tabs-margin-bottom-0"
        items={[
          { key: '1', label: t('history'), children: <AccountHistoryTable /> },
          { key: '2', label: t('form'), children: <ChartAccountForm /> },
          { key: '3', label: 'Alia-form', children: <Chart_form /> },
        ]}
      />
    </>
  );
}

export default ChartOfAccount;
