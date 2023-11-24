import { Card, theme } from 'antd';
import AccountPayablesTable from './table';

function AccountPayables() {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Card style={{ background: 'transparent' }}>
        <AccountPayablesTable />
      </Card>
    </>
  );
}

export default AccountPayables;
