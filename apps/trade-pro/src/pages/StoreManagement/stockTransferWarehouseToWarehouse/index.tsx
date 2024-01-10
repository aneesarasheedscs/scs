import { Row, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useGetStockTransferById } from './quries';
import { useAtom } from 'jotai';
import { viewDetailList, addtableData } from './form/Atom';
import StockTransferTable from './table/StockTransferTable';
import StockTransferForm from './form';
import './style.scss';

function StockTransfer() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);
  const [tableData, setTableData] = useAtom(addtableData);
  const {
    data: stockTransfergetById,
    refetch: refetchStock,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetStockTransferById(selectedRecordId);
  useEffect(() => {
    if (isDataSuccess) {
      setViewDetail(stockTransfergetById?.data?.Data?.Result?.WsRmWareHouseToWareHouseStocTransferDetailList);
    }
  }, [isDataSuccess]);
  return (
    <>
      <h2 className="" style={{ textAlign: 'center' }}>
        {t('stock_transfer_warehouse_to_warehouse')}{' '}
      </h2>

      <Tabs
        type="card"
        size="large"
        activeKey={activeTab}
        className="tabs-margin-bottom-0"
        onChange={(key) => setActiveTab(key)}
      >
        <Tabs.TabPane key="1" tab={t('history')}>
          <StockTransferTable setSelectedRecordId={setSelectedRecordId} setActiveTab={setActiveTab} />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab={t('form')}>
          <StockTransferForm
            selectedRecordId={selectedRecordId}
            setSelectedRecordId={setSelectedRecordId}
            stockTransfergetById={stockTransfergetById}
            refetchStock={refetchStock}
            isDataSuccess={isDataSuccess}
            isDataLoading={isDataLoading}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}

export default StockTransfer;
