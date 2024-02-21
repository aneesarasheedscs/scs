import './Card.scss';
import './DetailTableFile.scss';
import { useState } from 'react';
import CardView from './CardView';
import { Col, Row, theme } from 'antd';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import ReceiptsDetailTables from './DetailTable';
import { AntButton, AntTable } from '@tradePro/components';
import { useGetBankReceiptVoucherTable } from '../queries/queries';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

function ReceiptsTables({ setSelectedRecordId, setActiveTab, setSelectedRecordDetailId, refetch, isLoading }: TFrom) {
  const { t } = useTranslation();
  const { data, isError, isLoading: isLoadingBRV, refetch: refetchBRV, isFetching } = useGetBankReceiptVoucherTable();
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
          <CardView setSelectedRecordId={setSelectedRecordId} setActiveTab={setActiveTab} />
        ) : (
          <Col span={24}>
            <AntTable
              refetch={refetchBRV}
              isError={isError}
              numberOfSkeletons={8}
              isLoading={isLoadingBRV || isFetching}
              scroll={{ x: '', y: convertVhToPixels('35vh') }}
              data={data?.data?.Data?.Result || []}
              columns={columns(t, setSelectedRecordId, setActiveTab, setSelectedRecordDetailId)}
            />
            <ReceiptsDetailTables refetch={refetch} isLoading={isLoading} />
          </Col>
        )}
      </Row>
    </>
  );
}

type TFrom = {
  setSelectedRecordId: (id: number | null) => void;
  setActiveTab: (tab: string) => void;
  setSelectedRecordDetailId: (id: number | null) => void;
  refetch: any;
  isLoading: any;
};

export default ReceiptsTables;
