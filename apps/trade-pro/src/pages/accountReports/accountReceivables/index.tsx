import { Card, theme } from 'antd';
import AccountReceivablesTable from './table';

function AccountReceivables() {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Card style={{ background: 'transparent' }}>
        <AccountReceivablesTable />
      </Card>
    </>
  );
}

export default AccountReceivables;
