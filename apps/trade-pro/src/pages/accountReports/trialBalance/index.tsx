import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import TrialBalances from './trialBalanceTabsComponents/TrialBalance';
import SelectedTrialBalance from './trialBalanceTabsComponents/SelectedTrialBalance';
import AllLevelTrialBalance from './trialBalanceTabsComponents/AllLevelTrialBalance';

function TrialBalance() {
  const { t } = useTranslation();
  return (
    <>
      <Tabs
        type="card"
        size="large"
        defaultActiveKey="1"
        className="tabs-margin-bottom-0"
        items={[
          { key: '1', label: t('trial_balance'), children: <TrialBalances /> },
          { key: '2', label: t('selected_trial_balance'), children: <SelectedTrialBalance /> },
          { key: '3', label: t('all_level_trial_balance'), children: <AllLevelTrialBalance /> },
        ]}
      />
    </>
  );
}

export default TrialBalance;
