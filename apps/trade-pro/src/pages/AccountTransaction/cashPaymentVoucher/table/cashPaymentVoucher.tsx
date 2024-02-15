import './Card.scss';
import './Table.scss';
import { columns } from './columns';
import { useState } from 'react';
import CardView from './CardView';
import { Col, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import CashPaymentDetailTable from './DetailTable';
import { AntButton, AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetCashPaymentVoucherTable } from '../queries/queries';

function CashPaymentTable({
  setSelectedRecordId,
  setActiveTab,
  setSelectedRecordIdforDetail,
  refetch,
  isLoadingDetail,
}: TFrom) {
  const { t } = useTranslation();
  const { data, isError, isLoading, refetch: refetchCPV, isFetching } = useGetCashPaymentVoucherTable();
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
    <>
      <Row gutter={0} style={{ marginTop: '0%' }}>
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

        {showComponent ? (
          <CardView />
        ) : (
          <Col>
            <>
              <AntTable
                refetch={refetchCPV}
                isError={isError}
                numberOfSkeletons={8}
                isLoading={isLoading || isFetching}
                scroll={{ x: '', y: convertVhToPixels('35vh') }}
                data={data?.data?.Data?.Result || []}
                columns={columns(t, setSelectedRecordId, setActiveTab, setSelectedRecordIdforDetail)}
              />

              <CashPaymentDetailTable refetch={refetch} isLoadingDetail={isLoadingDetail} />
            </>
          </Col>
        )}
      </Row>
    </>
  );
}

type TFrom = {
  setSelectedRecordId: (id: number | null) => void;
  setActiveTab: (tab: string) => void;
  setSelectedRecordIdforDetail: (id: number | null) => void;
  refetch: any;
  isLoadingDetail: any;
};

export default CashPaymentTable;
