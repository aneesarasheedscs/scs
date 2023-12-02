import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import TrialBalanceReport from './trialBalanceReport';

function TrialBalance() {
  const { t } = useTranslation();
  return (
    <>
      <Tabs
        type="card"
        size="large"
        defaultActiveKey="1"
        className="tabs-margin-bottom-0"
        items={[{ key: '1', label: t('trial_balance'), children: <TrialBalanceReport /> }]}
      />
    </>
  );
}

export default TrialBalance;
