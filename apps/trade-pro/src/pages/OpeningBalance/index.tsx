import ChartAccountForm from '@tradePro/pages/chartOfAccount/form';
import AccountHistoryTable from '@tradePro/pages/chartOfAccount/table';
import { Tabs, theme } from 'antd';
import { useTranslation } from 'react-i18next';

import './Table/style.scss';
import JournalVoucherForm from './Form';
import OpeningBalanceForm from './Form';
import AccountTable from './Table';
function AccountOpeningBalance() {
  const { t } = useTranslation();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <>
      <h4 className="journal-voucher-history" style={{ background: colorPrimary }}>
        Account Opening Balance
      </h4>
      <OpeningBalanceForm />
      <AccountTable />
    </>
  );
}

export default AccountOpeningBalance;
