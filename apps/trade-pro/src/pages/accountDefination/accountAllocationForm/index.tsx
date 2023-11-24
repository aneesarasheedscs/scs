import { useTranslation } from 'react-i18next';
import './style.scss';
import AccountAllocation from './accoutAllocation';

const AccountAllocationReport = () => {
  const { t } = useTranslation();
  return (
    <div style={{ background: '#fff' }}>
      <AccountAllocation />
    </div>
  );
};

export default AccountAllocationReport;
