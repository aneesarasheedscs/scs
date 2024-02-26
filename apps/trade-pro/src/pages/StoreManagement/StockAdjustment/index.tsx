import './style.scss';
import { Tabs } from 'antd';
import { useAtom } from 'jotai';
import RequisitionOrderForm from './form';
import { viewDetailList } from './form/Atom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import StockAdjustmentTable from './table/StockAdjustmentTable';
import { useGetStockAdjustmentById, useGetStockByIdforDetail } from './quries';

function StockAdjustment() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [selectedRecordIdforDetail, setSelectedRecordIdforDetail] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);
  const {
    data: stockAdjustmentById,
    refetch: refetchReqesition,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetStockAdjustmentById(selectedRecordId);
  const {
    data: stockAdjustmentDetail,
    refetch: refetchDetail,
    isSuccess: isDataSuccessforDetail,
    isLoading: isDataLoadingDetail,
  } = useGetStockByIdforDetail(selectedRecordIdforDetail);

  useEffect(() => {
    if (isDataSuccessforDetail && !isDataLoadingDetail) {
      setViewDetail(stockAdjustmentById?.data?.Data?.Result?.WsRmRequisitionPoDetailsList);
    }
  }, [isDataSuccessforDetail, isDataLoadingDetail]);
  return (
    <>
      <h2 className="" style={{ textAlign: 'center' }}>
        {t('stock_adjustment')}
      </h2>

      <Tabs
        type="card"
        size="large"
        activeKey={activeTab}
        className="tabs-margin-bottom-0"
        onChange={(key) => setActiveTab(key)}
      >
        <Tabs.TabPane key="1" tab={t('history')}>
          <StockAdjustmentTable
            setSelectedRecordId={setSelectedRecordId}
            setActiveTab={setActiveTab}
            setSelectedRecordIdforDetail={setSelectedRecordIdforDetail}
            stockAdjustmentDetail={stockAdjustmentDetail?.data?.Data?.Result}
            isDataLoadingDetail={isDataLoadingDetail}
            refetchDetail={refetchDetail}
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab={t('form')}>
          <RequisitionOrderForm
            selectedRecordId={selectedRecordId}
            stockAdjustmentById={stockAdjustmentById?.data?.Data?.Result}
            isDataSuccess={isDataSuccess}
            isDataLoading={isDataLoading}
            setSelectedRecordId={setSelectedRecordId}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}

export default StockAdjustment;
