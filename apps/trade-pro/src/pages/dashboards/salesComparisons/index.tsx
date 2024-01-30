import React from 'react';
import SearchCriteria from './tables/SearchCriteria';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';

function SalesComparison() {
  const { t } = useTranslation();
  return (
    <div style={{ background: '#fff' }}>
      <h2 className="monthly_heading"> {t('sales_comparisons_report')}</h2>

      <SearchCriteria />
    </div>
  );
}

export default SalesComparison;
