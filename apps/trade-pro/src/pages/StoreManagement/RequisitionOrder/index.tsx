import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { viewDetailList } from './form/Atom';
import './style.scss';
import RequisitionOrderForm from './form';
import RequisitionOrderTable from './table/RequisitionOrderTable';
import RequisitionOrderDetailTable from './table/DetailTable';
import { useGetRequisitionOrderById, useGetRequisitionOrderByIdforDetail } from './quries';

function RequisitionOrder() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
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
    // refetch: refetchReqesition,
    isSuccess: isDataSuccessforDetail,
    isLoading: isDataLoadingDetail,
  } = useGetRequisitionOrderByIdforDetail(selectedRecordIdforDetail);

  useEffect(() => {
    if (isDataSuccessforDetail && !isDataLoadingDetail) {
      setViewDetail(requisitionById?.data?.Data?.Result?.WsRmRequisitionPoDetailsList);
    }
  }, [isDataSuccessforDetail, !isDataLoadingDetail]);
  return (
    <>
      <h2 className="form-heading"> {t('requisition_order')} </h2>

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
          />
          <RequisitionOrderDetailTable requisitionDetail={requisitionDetail} />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab={t('form')}>
          <RequisitionOrderForm
            selectedRecordId={selectedRecordId}
            requisitionById={requisitionById}
            refetchReqesition={refetchReqesition}
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
