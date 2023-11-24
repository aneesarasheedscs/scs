import { useTranslation } from 'react-i18next';
import StockReportHistoryTable from './table';

function StockReportswithValues() {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="form-heading"> {t('stock_report_with_values')} </h2>

      <StockReportHistoryTable />
    </>
  );
}

export default StockReportswithValues;
