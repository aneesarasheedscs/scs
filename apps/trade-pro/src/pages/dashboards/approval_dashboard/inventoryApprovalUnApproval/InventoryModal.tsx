import { Col, Row, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InventoryTable from './table/InventoryTable';
import { useGetRequisitionOrderById, useGetRequisitionOrderDetailById } from './query';
import RequisitionOrderForm from './form';
import { AntButton } from '@tradePro/components';
import CardView from './table/cardView';

const InventoryModal: React.FC<{
  activeTab: string;
  setActiveTab: any;
  selectedRecordId: number | null | undefined;
  setSelectedRecordId: any;
  cardTitle: string;
  approvalId: number | null;
  appRovalUnApproval: boolean;

  showComponent: any;
  setShowComponent: any;
}> = (props) => {
  const {
    approvalId,
    setShowComponent,
    showComponent,
    appRovalUnApproval,
    cardTitle,
    activeTab,
    setActiveTab,
    selectedRecordId,
    setSelectedRecordId,
  } = props;
  const [selectedRecordIdforDetail, setSelectedRecordIdforDetail] = useState<number | null>();
  const {
    data: requisitionDetailById,
    isSuccess,
    isLoading,
    refetch,
    isError,
  } = useGetRequisitionOrderById(selectedRecordId);
  const {
    data: requisitionDetail,
    isSuccess: successDetail,
    isLoading: loadingDetail,
    refetch: refetchDetail,
  } = useGetRequisitionOrderDetailById(selectedRecordIdforDetail);
  const { t } = useTranslation();
  // const [showComponent, setShowComponent] = useState(false);

  const toggleGridView = () => {
    setShowComponent(false);
  };
  const toggleCardView = () => {
    setShowComponent(true);
  };

  return (
    <>
      <Tabs
        type="card"
        size="large"
        activeKey={activeTab}
        className="tabs-margin-bottom-0"
        onChange={(key) => setActiveTab(key)}
      >
        <Tabs.TabPane key="1" tab={t('history')}>
          <Row align="middle" className="">
            <Col xs={24} sm={24}>
              <h2>
                {/* {`${cardTitle}`} */}
                {appRovalUnApproval ? `${cardTitle} for UnApproval` : `${cardTitle} for Approval `}
                <Row gutter={0} style={{ display: 'flex', justifyContent: 'end', marginTop: '-2%' }}>
                  <div style={{ display: 'flex' }}>
                    <AntButton onClick={toggleGridView} className="btn" label="Grid View" />

                    <AntButton onClick={toggleCardView} className="btn" label="Card View" />
                  </div>
                </Row>
              </h2>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} xl={24}>
              {showComponent ? (
                <>
                  <CardView setActiveTab={setActiveTab} setSelectedRecordId={setSelectedRecordId} />
                </>
              ) : (
                <>
                  <InventoryTable
                    setSelectedRecordId={setSelectedRecordId}
                    setActiveTab={setActiveTab}
                    setSelectedRecordIdforDetail={setSelectedRecordIdforDetail}
                    requisitionDetail={requisitionDetail}
                    refetchDetail={refetchDetail}
                    loadingDetail={loadingDetail}
                  />
                </>
              )}
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab={t('form')}>
          <Row align="middle" className="">
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              {/* <h2>{t('requisition_order_for_approval')}</h2> */}
              <h2> {appRovalUnApproval ? `${cardTitle} for UnApproval` : `${cardTitle} for Approval `}</h2>

              <RequisitionOrderForm
                selectedRecordId={selectedRecordId}
                requisitionById={requisitionDetailById}
                refetch={refetch}
                isSuccess={isSuccess}
                isLoading={isLoading}
                isError={isError}
                setSelectedRecordId={setSelectedRecordId}
              />
            </Col>
          </Row>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default InventoryModal;
