import './Card.scss';
import './DetailTableFile.scss';
import { useState } from 'react';
import CardView from './CardView';
import { columns } from './columns';
import { Col, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import BankPaymentDetailTable from './DetailTable';
import { AntButton, AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetBankPaymentVoucherTable } from '../queries/queries';

function BankPaymentTable({
  setSelectedRecordId,
  setActiveTab,
  setSelectedRecordDetailId,
  refetch,
  isLoading,
}: TBPVHistory) {
  const { t } = useTranslation();
  const { data, isError, isLoading: isLoadingBPV, refetch: refetchBPV, isFetching } = useGetBankPaymentVoucherTable();
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
          <CardView setSelectedRecordId={setSelectedRecordId} setActiveTab={setActiveTab} />
        ) : (
          <Col span={24}>
            <>
              <AntTable
                refetch={refetchBPV}
                isError={isError}
                numberOfSkeletons={8}
                isLoading={isLoadingBPV || isFetching}
                scroll={{ x: '', y: convertVhToPixels('35vh') }}
                data={data?.data?.Data?.Result || []}
                columns={columns(t, setSelectedRecordId, setActiveTab, setSelectedRecordDetailId)}
              />

              <BankPaymentDetailTable refetch={refetch} isLoading={isLoading} />
            </>
          </Col>
        )}
      </Row>
    </>
  );
}

type TBPVHistory = {
  setSelectedRecordId: (id: number | null) => void;
  setActiveTab: (tab: string) => void;
  setSelectedRecordDetailId: (id: number | null) => void;
  refetch: () => void;
  isLoading: boolean;
};

export default BankPaymentTable;
