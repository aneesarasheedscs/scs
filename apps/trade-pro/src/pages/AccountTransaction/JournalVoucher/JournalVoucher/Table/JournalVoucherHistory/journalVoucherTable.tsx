import { Col, Row, theme } from 'antd';
import { columns } from './columns';
import { AntButton, AntTable } from '@tradePro/components';
import { useTranslation } from 'react-i18next';
import { useGetJournalVocherHistory } from '../../quries';
import JournalVoucherDetailTable from '../JournalVoucherDetail';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useState } from 'react';

function JournalVoucherTable({
  setSelectedRecordId,
  setActiveTab,
  setSelectedRecordDetailId,
  refetch,
  isLoading,
}: TFrom) {
  const { t } = useTranslation();
  const { data, isError, isLoading: isLoadingJV, refetch: refetchJV, isFetching } = useGetJournalVocherHistory();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [showComponent, setShowComponent] = useState(false);

  const toggleCardView = () => {
    setShowComponent(true);
  };
  const toggleGridView = () => {
    setShowComponent(false);
  };

  return (
    <>
      <Row gutter={10}>
        <Col span={18} style={{ marginLeft: '0.5%', borderTop: '1px solid #dfdfdf' }}>
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
          <>{/* <CardView /> */}</>
        ) : (
          <Col span={24}>
            <Row style={{}}>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={18}>
                <AntTable
                  refetch={refetchJV}
                  isError={isError}
                  numberOfSkeletons={10}
                  isLoading={isLoadingJV || isFetching}
                  scroll={{ x: '', y: convertVhToPixels('35vh') }}
                  data={data?.data?.Data?.Result || []}
                  columns={columns(t, setSelectedRecordId, setActiveTab, setSelectedRecordDetailId)}
                />
                <JournalVoucherDetailTable refetch={refetch} isLoading={isLoading} />
              </Col>
            </Row>
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

export default JournalVoucherTable;
