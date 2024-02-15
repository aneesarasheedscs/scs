import './Card.scss';
import './DetailTableFile.scss';
import { columns } from './columns';
import { useState } from 'react';
import CardView from './CardView';
import { Col, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import ContraVoucherDetailTable from './DetailTable';
import { useGetContraVoucherTable } from '../queries/queries';
import { AntButton, AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

function ContraVoucherTable({
  setSelectedRecordId,
  setSelectedRecordIdforDetail,
  setActiveTab,
  refetch,
  isLoading,
}: TFrom) {
  const { t } = useTranslation();
  const { data, isError, isLoading: isLoadingContra, refetch: refetchContra, isFetching } = useGetContraVoucherTable();
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
          <CardView />
        ) : (
          <Col span={24}>
            <>
              <AntTable
                refetch={refetchContra}
                isError={isError}
                numberOfSkeletons={8}
                isLoading={isLoadingContra || isFetching}
                scroll={{ x: '', y: convertVhToPixels('35vh') }}
                data={data?.data?.Data?.Result || []}
                columns={columns(t, setSelectedRecordId, setSelectedRecordIdforDetail, setActiveTab)}
              />
              <ContraVoucherDetailTable refetch={refetch} isLoading={isLoading} />
            </>
          </Col>
        )}
      </Row>
    </>
  );
}

type TFrom = {
  setSelectedRecordId: (Id: number | null) => void;
  setSelectedRecordIdforDetail: (Id: number | null) => void;
  setActiveTab: (tab: string) => void;
  refetch: any;
  isLoading: any;
};

export default ContraVoucherTable;
