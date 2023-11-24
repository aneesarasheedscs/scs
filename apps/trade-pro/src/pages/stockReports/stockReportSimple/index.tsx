import { Card, theme } from 'antd';
import StockReportSimpleTable from '../stockReportSimple/table';
import { useTranslation } from 'react-i18next';

function StockReportSimple() {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const { t } = useTranslation();
  const formHeading = {
    fontFamily: 'Times New Roman',
    borderRadius: '5px',
    padding: '5px',
    boxShadow: '2px 4px 12px 1px gray',
    marginBottom: '7px',
    fontSize: '1.8rem',
  };
  return (
    <>
      <h2 style={formHeading}>{t('stock_report')}</h2>

      <Card style={{ background: 'transparent' }}>
        <StockReportSimpleTable />
      </Card>
    </>
  );
}

export default StockReportSimple;
