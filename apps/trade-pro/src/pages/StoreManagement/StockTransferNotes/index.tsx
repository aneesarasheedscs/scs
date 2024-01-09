import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import './style.scss';
import { useGetStockTransferByIdforDetail, useGetStockTransferNotesById } from './quries';
import StockTransferTable from './table/StockTransferTable';
import StockTransferNoteForm from './form';

function StockTranferNotes() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const [selectedRecordIdforDetail, setSelectedRecordIdforDetail] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const {
    data: stockTransferById,
    refetch: refetchStock,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetStockTransferNotesById(selectedRecordId);
  const {
    data: stockTransferDetail,
    refetch: refetchDetail,
    isSuccess: isDataSuccessDetail,
    isLoading: isDataLoadingDetail,
  } = useGetStockTransferByIdforDetail(selectedRecordIdforDetail);

  return (
    <>
      <h2 style={{ textAlign: 'center' }}> {t('stock_transfer_notes')} </h2>

      <Tabs
        type="card"
        size="large"
        activeKey={activeTab}
        className="tabs-margin-bottom-0"
        onChange={(key) => setActiveTab(key)}
      >
        <Tabs.TabPane key="1" tab={t('history')}>
          <StockTransferTable
            setSelectedRecordId={setSelectedRecordId}
            setActiveTab={setActiveTab}
            setSelectedRecordIdforDetail={setSelectedRecordIdforDetail}
            stockTransferDetail={stockTransferDetail}
            isDataLoadingDetail={isDataLoadingDetail}
            refetchDetail={refetchDetail}
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab={t('form')}>
          <StockTransferNoteForm
            selectedRecordId={selectedRecordId}
            stockTransferById={stockTransferById}
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

export default StockTranferNotes;
