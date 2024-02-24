import './style.scss';
import { Tabs } from 'antd';
import { useAtom } from 'jotai';
import RequisitionOrderForm from './form';
import { viewDetailList } from './form/Atom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RequisitionOrderTable from './table/RequisitionOrderTable';
import { useGetRequisitionOrderById, useGetRequisitionOrderByIdforDetail } from './quries';

function RequisitionOrder() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [selectedRecordIdforDetail, setSelectedRecordIdforDetail] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);
  const {
    data: requisitionById,
    refetch: refetchReqesition,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetRequisitionOrderById(selectedRecordId);
  const {
    data: requisitionDetail,
    refetch: refetchDetail,
    isSuccess: isDataSuccessforDetail,
    isLoading: isDataLoadingDetail,
  } = useGetRequisitionOrderByIdforDetail(selectedRecordIdforDetail);

  useEffect(() => {
    if (isDataSuccessforDetail && !isDataLoadingDetail) {
      setViewDetail(requisitionById?.data?.Data?.Result?.WsRmRequisitionPoDetailsList);
    }
  }, [isDataSuccessforDetail, isDataLoadingDetail]);
  return (
    <>
      <h2 className="" style={{ textAlign: 'center' }}>
        {t('requisition_order')}
      </h2>

      <Tabs
        type="card"
        size="large"
        activeKey={activeTab}
        className="tabs-margin-bottom-0"
        onChange={(key) => setActiveTab(key)}
      >
        <Tabs.TabPane key="1" tab={t('history')}>
          <RequisitionOrderTable
            setSelectedRecordId={setSelectedRecordId}
            setActiveTab={setActiveTab}
            setSelectedRecordIdforDetail={setSelectedRecordIdforDetail}
            requisitionDetail={requisitionDetail?.data?.Data?.Result}
            isDataLoadingDetail={isDataLoadingDetail}
            refetchDetail={refetchDetail}
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab={t('form')}>
          <RequisitionOrderForm
            selectedRecordId={selectedRecordId}
            requisitionById={requisitionById?.data?.Data?.Result}
            isDataSuccess={isDataSuccess}
            isDataLoading={isDataLoading}
            setSelectedRecordId={setSelectedRecordId}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}

export default RequisitionOrder;
