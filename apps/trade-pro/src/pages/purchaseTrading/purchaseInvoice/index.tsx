import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import TabPane from 'antd/es/tabs/TabPane';
// import GRNDetailForm from './form';
import { useGRNPurchaseOrderLoadTable } from './query';
import GRNHistoryTable from './history/table';
import { useAtom } from 'jotai';
import { selectedRowsAtom } from './purchaseOrderLoad/loadOrderTable/Atom';
import LoadOrderDetailForm from './purchaseOrderLoad/LoadOrderForm';
import GRNDetailLoadOrderTable from './history/detailTable/DetailTable';
import PurchaseInvoiceForm from './form';

function PurchaseInvoice() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('2');
  const [showGRNDetailTable, setShowGRNDetailTable] = useState(false);
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);

  const { data: loadOrderData, refetch, isError, isLoading, isFetching } = useGRNPurchaseOrderLoadTable();

  const handleLoadOrderButtonClick = (selectedData: any) => {
    setActiveTab('1');
  };
  const handleLoadButtonClick = () => {
    const selectedData = loadOrderData?.data?.Data?.Result.filter((row: any) =>
      selectedRows.includes(row.OrderDetailId)
    );

    setShowGRNDetailTable(true);
    setSelectedRows(selectedData);
    setActiveTab('2');
  };
  return (
    <>
      <h2 className="form-heading"> Purchase Invoice Against Order </h2>

      <Tabs
        type="card"
        size="large"
        activeKey={activeTab}
        className="tabs-margin-bottom-0"
        onChange={(key) => setActiveTab(key)}
      >
        <TabPane tab={t('history')} key="1">
          {/* <GRNHistoryTable />
          <GRNDetailLoadOrderTable
            loadOrderData={loadOrderData}
            refetch={refetch}
            isError={isError}
            isLoading={isLoading}
            isFetching={isFetching}
          /> */}
        </TabPane>
        <TabPane tab={t('form')} key="2">
          <PurchaseInvoiceForm
            selectedRows={selectedRows}
            showGRNDetailTable={showGRNDetailTable}
            handleLoadOrderButtonClick={handleLoadOrderButtonClick}
            refetch={refetch}
            isError={isError}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        </TabPane>
        <TabPane tab={t('purchase_order_load')} key="3">
          <LoadOrderDetailForm handleLoadButtonClick={handleLoadButtonClick} />
        </TabPane>
      </Tabs>
    </>
  );
}

export default PurchaseInvoice;
