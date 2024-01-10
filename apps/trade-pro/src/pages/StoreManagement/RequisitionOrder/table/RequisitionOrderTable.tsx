import { AntButton, AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, Row, theme } from 'antd';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import { useRequisitionOrderHistory } from '../quries';
import { useState } from 'react';
import RequisitionOrderDetailTable from './DetailTable';
import CardView from './cardView';

function RequisitionOrderTable({
  setSelectedRecordId,
  setActiveTab,
  setSelectedRecordIdforDetail,
  requisitionDetail,
  isDataLoadingDetail,
  refetchDetail,
}: TFrom) {
  const { t } = useTranslation();
  const { data, isError, isLoading, refetch, isFetching } = useRequisitionOrderHistory();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [showComponent, setShowComponent] = useState(false);

  const toggleGridView = () => {
    setShowComponent(false);
  };
  const toggleCardView = () => {
    setShowComponent(true);
  };
  return (
    <div>
      <Row style={{ marginTop: '' }}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={24}>
          <h2 className="form-heading2">
            <Row gutter={10} style={{ display: 'flex' }}>
              <div style={{ display: 'flex' }}>
                <AntButton onClick={toggleGridView} className="btn" label={t('grid_view')} />

                <AntButton
                  onClick={toggleCardView}
                  className="btn"
                  label={t('card_view')}
                  style={{ marginLeft: '2%' }}
                />
              </div>
            </Row>
          </h2>
          <div>
            {showComponent ? (
              <>
                <CardView setActiveTab={setActiveTab} setSelectedRecordId={setSelectedRecordId} />
              </>
            ) : (
              <>
                <AntTable
                  refetch={refetch}
                  isError={isError}
                  numberOfSkeletons={8}
                  isLoading={isLoading}
                  scroll={{ x: '', y: convertVhToPixels('30vh') }}
                  data={data?.data?.Data?.Result || []}
                  columns={columns(t, setSelectedRecordId, setActiveTab, setSelectedRecordIdforDetail)}
                />
                <RequisitionOrderDetailTable
                  requisitionDetail={requisitionDetail}
                  isDataLoadingDetail={isDataLoadingDetail}
                  refetchDetail={refetchDetail}
                />
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

type TFrom = {
  setSelectedRecordId: (id: number | null) => void;
  setSelectedRecordIdforDetail: (id: number | null) => void;
  setActiveTab: (tab: string) => void;

  requisitionDetail: any;
  isDataLoadingDetail: any;
  refetchDetail: any;
};

export default RequisitionOrderTable;
