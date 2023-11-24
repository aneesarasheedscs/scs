import React from 'react';
import SearchCriteria from './tables/SearchCriteria';
import { useTranslation } from 'react-i18next';

function SalesComparison() {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="form-heading"> {t('sales_comparisons_report')}</h2>

      <SearchCriteria />
      {/* <MonthlySaleCriteria /> */}
    </>
  );
}

export default SalesComparison;
