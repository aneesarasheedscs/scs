import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import './style.scss';
import { useGetStockReceivedNoteByIdforDetail, useGetStockReceivedNotesById } from './quries';
import StockReceivedNoteTable from './table/StockReceivedNoteTable';
import StockTransferNoteForm from './form';

function StockReceivedNotes() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const [selectedRecordIdforDetail, setSelectedRecordIdforDetail] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const {
    data: stockReceivedById,
    refetch: refetchStock,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetStockReceivedNotesById(selectedRecordId);
  const {
    data: stockReceivedDetail,
    refetch: refetchDetail,
    isSuccess: isDataSuccessDetail,
    isLoading: isDataLoadingDetail,
  } = useGetStockReceivedNoteByIdforDetail(selectedRecordIdforDetail);

  return (
    <>
      <h2 style={{ textAlign: 'center' }}> {t('stock_received_notes')} </h2>

      <Tabs
        type="card"
        size="large"
        activeKey={activeTab}
        className="tabs-margin-bottom-0"
        onChange={(key) => setActiveTab(key)}
      >
        <Tabs.TabPane key="1" tab={t('history')}>
          <StockReceivedNoteTable
            setSelectedRecordId={setSelectedRecordId}
            setActiveTab={setActiveTab}
            setSelectedRecordIdforDetail={setSelectedRecordIdforDetail}
            stockReceivedDetail={stockReceivedDetail}
            isDataLoadingDetail={isDataLoadingDetail}
            refetchDetail={refetchDetail}
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab={t('form')}>
          <StockTransferNoteForm
            selectedRecordId={selectedRecordId}
            stockReceivedById={stockReceivedById}
            refetchStock={refetchStock}
            isDataSuccess={isDataSuccess}
            isDataLoading={isDataLoading}
            setSelectedRecordId={setSelectedRecordId}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}

export default StockReceivedNotes;
