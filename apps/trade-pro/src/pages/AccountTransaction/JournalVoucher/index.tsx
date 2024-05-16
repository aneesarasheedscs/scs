import ChartAccountForm from '@tradePro/pages/chartOfAccount/form';
import AccountHistoryTable from '@tradePro/pages/chartOfAccount/table';
import { Tabs, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import FormTable from './Form';
import HistoryTable from './History';
import '../style.scss';
function JournalVoucher() {
  const { t } = useTranslation();

  return (
    <>
      <h4 className="journal-voucher-history">Journal Voucher</h4>
      {/* <h2 className="form-heading">Journal Voucher</h2> */}
      <Tabs
        type="card"
        size="large"
        defaultActiveKey="1"
        className="tabs-margin-bottom-0"
        items={[
          { key: '1', label: t('history'), children: <HistoryTable /> },
          { key: '2', label: t('form'), children: <FormTable /> },
        ]}
      />
    </>
  );
}

export default JournalVoucher;
