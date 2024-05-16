import { useTranslation } from 'react-i18next';
import TrialBalanceSelectedReport from './trialBalanceSelected';
import './style.scss'
function TrialBalanceSelected() {
  const { t } = useTranslation();
  return (
    <>
      <TrialBalanceSelectedReport />
    </>
  );
}

export default TrialBalanceSelected;
