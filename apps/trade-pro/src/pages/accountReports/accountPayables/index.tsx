import { Card, theme } from 'antd';
import AccountPayablesTable from './table';
import { tableData } from './table/Atom';
import './style.scss';

function AccountPayables() {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <div style={{ background: '#fff' }}>
      <AccountPayablesTable />
    </div>
  );
}

export default AccountPayables;
