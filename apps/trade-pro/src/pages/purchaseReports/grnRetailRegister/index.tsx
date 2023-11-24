import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import LoadOrderDetailForm from './form/LoadOrderForm';
import { useState } from 'react';
import TabPane from 'antd/es/tabs/TabPane';
import GRNHistoryTable from './table';

function GRNRetailRegister() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('1');

  return (
    <>
      <h2 className="form-heading"> GRN History</h2>

      <GRNHistoryTable />
    </>
  );
}

export default GRNRetailRegister;
