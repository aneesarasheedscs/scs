import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import TrialBalanceReport from './trialBalanceReport';

function TrialBalance() {
  const { t } = useTranslation();
  return (
    <>
      <TrialBalanceReport />
    </>
  );
}

export default TrialBalance;
