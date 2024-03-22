import './Card.scss';
import './DetailTableFile.scss';
import { useState } from 'react';
// import CardView from './CardView';
import { columns } from './columns';
import { Col, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { AntButton, AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetBillsPayablesAccountsVoucherTable } from '../query';
import BillsReceivableAccountsDetailTable from './DetailTable';

function BillsReceivableHistory({
  setSelectedRecordId,
  setActiveTab,
  setSelectedRecordDetailId,
  refetch,
  isLoading,
}: TFrom) {
  const { t } = useTranslation();
  const {
    data,
    isError,
    isLoading: isLoadingBPA,
    refetch: refetchBPA,
    isFetching,
  } = useGetBillsPayablesAccountsVoucherTable();
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
            style={{
              background: showComponent ? '' : '#fff',
              color: showComponent ? '' : `${colorPrimary}`,
              fontWeight: 'bold',
              border: showComponent ? '' : `1px solid ${colorPrimary}`,
            }}
            className=""
            label={t('grid_view')}
          />
          <AntButton
            style={{
              background: showComponent ? '#fff' : '',
              color: showComponent ? `${colorPrimary}` : '',
              border: showComponent ? `1px solid ${colorPrimary}` : '',
              fontWeight: 'bold',
              marginLeft: '0.2%',
            }}
            onClick={toggleCardView}
            className=""
            label={t('card_view')}
          />
        </Col>

        {showComponent ? (
          <>{/* <CardView setSelectedRecordId={setSelectedRecordId} setActiveTab={setActiveTab} /> */}</>
        ) : (
          <Col span={24}>
            <>
              <AntTable
                refetch={refetchBPA}
                isError={isError}
                numberOfSkeletons={8}
                isLoading={isLoadingBPA || isFetching}
                scroll={{ x: '', y: convertVhToPixels('35vh') }}
                data={data?.data?.Data?.Result || []}
                columns={columns(t, setSelectedRecordId, setActiveTab, setSelectedRecordDetailId)}
              />

              <BillsReceivableAccountsDetailTable refetch={refetch} isLoading={isLoading} />
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
  setSelectedRecordDetailId: (id: number | null) => void;
  refetch: any;
  isLoading: any;
};

export default BillsReceivableHistory;
