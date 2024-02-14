import './Card.scss';
import './DetailTableFile.scss';
import CardView from './CardView';
import { useState } from 'react';
import { Col, Row, theme } from 'antd';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import CashReceiptDetailTable from './DetailTable';
import { AntButton, AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetCashReceiptVoucherTable } from '../queries/queries';

function CashReceiptTable({
  setSelectedRecordId,
  setActiveTab,
  setSelectedRecordIdforDetail,
  refetch,
  isLoading,
}: TFrom) {
  const { t } = useTranslation();
  const { data, isError, isLoading: isLoadingCRV, refetch: refetchCRV, isFetching } = useGetCashReceiptVoucherTable();
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
      <Row gutter={10}>
        <Col span={24} style={{ marginLeft: '0.5%', borderTop: '1px solid #dfdfdf' }}>
          <AntButton onClick={toggleCardView} className="" label={t('card_view')} />
          <AntButton onClick={toggleGridView} className="" style={{ marginLeft: '0.2%' }} label={t('grid_view')} />
        </Col>

        {showComponent ? (
          <CardView />
        ) : (
          <Col>
            <>
              <AntTable
                refetch={refetchCRV}
                isError={isError}
                numberOfSkeletons={8}
                isLoading={isLoadingCRV || isFetching}
                scroll={{ x: '', y: convertVhToPixels('35vh') }}
                data={data?.data?.Data?.Result || []}
                columns={columns(t, setSelectedRecordId, setActiveTab, setSelectedRecordIdforDetail)}
              />

              <CashReceiptDetailTable refetch={refetch} isLoading={isLoading} />
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
  isLoading: any;
};

export default CashReceiptTable;
