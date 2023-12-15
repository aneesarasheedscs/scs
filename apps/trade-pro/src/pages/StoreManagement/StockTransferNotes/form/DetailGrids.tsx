import { FormInstance, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ExpenseEntryForm from './ExpenseEntry';
import DynamicForm from './DetailEntry';

function DetailGrids({ form, selectedRecordId }: TDynamicForm) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('1');
  useEffect(() => {
    if (selectedRecordId) {
      setActiveTab('1');
    }
  }, [selectedRecordId]);
  return (
    <>
      <Tabs
        type="card"
        size="large"
        activeKey={activeTab}
        className="tabs-margin-bottom-0"
        onChange={(key) => setActiveTab(key)}
      >
        <Tabs.TabPane key="1" tab={t('detail')}>
          <DynamicForm form={form} />
          {/* <StockTransferTable
            setSelectedRecordId={setSelectedRecordId}
            setActiveTab={setActiveTab}
            setSelectedRecordIdforDetail={setSelectedRecordIdforDetail}
          /> */}
          {/* <RequisitionOrderDetailTable
            stockTransferDetail={stockTransferDetail}
            isDataLoadingDetail={isDataLoadingDetail}
            refetchDetail={refetchDetail}
          /> */}
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab={t('expense')}>
          <ExpenseEntryForm form={form} />

          {/* <StockTransferNoteForm
            selectedRecordId={selectedRecordId}
            stockTransferById={stockTransferById}
            refetchStock={refetchStock}
            isDataSuccess={isDataSuccess}
            isDataLoading={isDataLoading}
            setSelectedRecordId={setSelectedRecordId}
          /> */}
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}
type TDynamicForm = { form: FormInstance; selectedRecordId: any };

export default DetailGrids;
