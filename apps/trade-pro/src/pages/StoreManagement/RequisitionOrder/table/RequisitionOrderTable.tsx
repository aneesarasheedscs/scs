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
    <>
      <Row style={{ marginTop: '' }}>
        <Col span={24} style={{ marginLeft: '0.5%', borderTop: '1px solid #dfdfdf' }}>
          <AntButton
            onClick={toggleGridView}
            className=""
            style={{
              background: showComponent ? '' : '#fff',
              color: showComponent ? '' : `${colorPrimary}`,
              fontWeight: 'bold',
              border: showComponent ? '' : `1px solid ${colorPrimary}`,
            }}
            label={t('grid_view')}
          />
          <AntButton
            onClick={toggleCardView}
            style={{
              background: showComponent ? '#fff' : '',
              color: showComponent ? `${colorPrimary}` : '',
              fontWeight: 'bold',
              border: showComponent ? `1px solid ${colorPrimary}` : '',
              marginLeft: '0.2%',
            }}
            className=""
            label={t('card_view')}
          />
        </Col>

        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={24}>
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
    </>
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
