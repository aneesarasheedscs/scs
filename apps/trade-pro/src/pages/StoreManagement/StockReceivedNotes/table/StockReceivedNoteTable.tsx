import { AntButton, AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, Row, theme } from 'antd';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import { useStockReceivedNotesHistory } from '../quries';
import React, { useState } from 'react';
import RequisitionOrderDetailTable from './DetailTable';
import CardView from './CardView';
import './Table.scss';

function StockReceivedNoteTable({
  setSelectedRecordId,
  setActiveTab,
  setSelectedRecordIdforDetail,
  stockReceivedDetail,
  isDataLoadingDetail,
  refetchDetail,
}: TFrom) {
  const { t } = useTranslation();
  const { data, isError, isLoading, refetch, isFetching } = useStockReceivedNotesHistory();

  const [showComponent, setShowComponent] = useState(false);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const toggleCardView = () => {
    setShowComponent(true);
  };
  const toggleGridView = () => {
    setShowComponent(false);
  };
  return (
    <div>
      <Row style={{ marginTop: '0%' }}>
        <Col span={24}>
          <AntButton
            onClick={toggleGridView}
            className={showComponent ? 'toggleGridView' : 'toggleCardView'}
            label={t('grid_view')}
          />
          <AntButton
            onClick={toggleCardView}
            className={showComponent ? 'toggleCardView' : 'toggleGridView'}
            label={t('card_view')}
          />
        </Col>
        {showComponent ? (
          <>
            <CardView setActiveTab={setActiveTab} setSelectedRecordId={setSelectedRecordId} />
          </>
        ) : (
          <Col>
            <AntTable
              refetch={refetch}
              isError={isError}
              numberOfSkeletons={8}
              isLoading={isLoading}
              scroll={{ x: '', y: convertVhToPixels('30vh') }}
              data={data?.data?.Data?.Result || []}
              columns={columns(t, setSelectedRecordId, setActiveTab, setSelectedRecordIdforDetail)}
            />
            <Col>
              <RequisitionOrderDetailTable
                stockReceivedDetail={stockReceivedDetail}
                isDataLoadingDetail={isDataLoadingDetail}
                refetchDetail={refetchDetail}
              />
            </Col>
          </Col>
        )}
      </Row>
    </div>
  );
}

type TFrom = {
  setSelectedRecordId: (id: number | null) => void;
  setSelectedRecordIdforDetail: (id: number | null) => void;
  setActiveTab: (tab: string) => void;
  stockReceivedDetail: any;
  isDataLoadingDetail: any;
  refetchDetail: any;
};

export default StockReceivedNoteTable;
