import { useTranslation } from 'react-i18next';
import SearchCriteria from './tables/SearchCriteria';

function MonthandQuarterWiseSaleReport() {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="form-heading">{t('month_and_quarter_wise_sale_report')} </h2>
      <SearchCriteria />
    </>
  );
}

export default MonthandQuarterWiseSaleReport;
