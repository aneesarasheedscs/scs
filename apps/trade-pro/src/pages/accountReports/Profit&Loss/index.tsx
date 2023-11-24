import { useTranslation } from 'react-i18next';
import ProfitLossCriteria from './profit&lossReport/SearchCriteria';

function ProfitLossReport() {
  const { t } = useTranslation();
  return (
    <>
      <ProfitLossCriteria />
    </>
  );
}

export default ProfitLossReport;
