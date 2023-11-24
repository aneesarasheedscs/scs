import { useTranslation } from 'react-i18next';
import TrialBalanceSelectedReport from './trialBalanceSelected';

function TrialBalanceSelected() {
  const { t } = useTranslation();
  return (
    <>
      <TrialBalanceSelectedReport />
    </>
  );
}

export default TrialBalanceSelected;
