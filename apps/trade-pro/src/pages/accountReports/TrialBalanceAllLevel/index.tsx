import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import TrialBalanceAllLevelReport from './trialBalanceAllLevel';

function TrialBalance() {
  const { t } = useTranslation();
  return (
    <>
      <Tabs
        type="card"
        size="large"
        defaultActiveKey="1"
        className="tabs-margin-bottom-0"
        items={[{ key: '1', label: t('selected_trial_balace'), children: <TrialBalanceAllLevelReport /> }]}
      />
    </>
  );
}

export default TrialBalance;
