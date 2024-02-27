import './Card.scss';
import './DetailTableFile.scss';
import { columns } from './columns';
import { useState } from 'react';
import CardView from './CardView';
import { Col, Row } from 'antd';
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
}: TCVHistory) {
  const { t } = useTranslation();
  const { data, isError, isLoading: isLoadingContra, refetch: refetchContra, isFetching } = useGetContraVoucherTable();
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
        <Col span={24} style={{ marginLeft: '0.5%', borderTop: '1px solid #dfdfdf' }}>
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
          <Col span={24} style={{}}>
            <CardView setSelectedRecordId={setSelectedRecordId} setActiveTab={setActiveTab} />
          </Col>
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

type TCVHistory = {
  setSelectedRecordId: (Id: number | null) => void;
  setSelectedRecordIdforDetail: (Id: number | null) => void;
  setActiveTab: (tab: string) => void;
  refetch: () => void;
  isLoading: boolean;
};

export default ContraVoucherTable;
