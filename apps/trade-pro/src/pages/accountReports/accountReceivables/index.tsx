import { Card, theme } from 'antd';
import AccountReceivablesTable from './table';
import './style.scss';

function AccountReceivables() {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <div style={{ background: '#fff' }}>
        <AccountReceivablesTable />
      </div>
    </>
  );
}

export default AccountReceivables;
