import { useTranslation } from 'react-i18next';
import SearchCriteria from './tables/SearchCriteria';
import './style.scss';

function MonthandQuarterWiseSaleReport() {
  const { t } = useTranslation();
  return (
    <div style={{ background: '#fff' }}>
      <SearchCriteria />
    </div>
  );
}

export default MonthandQuarterWiseSaleReport;
