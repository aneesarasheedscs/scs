import { AntButton, AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, Row, theme } from 'antd';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import { useGetBankPaymentVoucherTable } from '../queries/queries';
import { useState } from 'react';
import './Card.scss';
import './DetailTableFile.scss';
import CardView from './CardView';
import BankPaymentDetailTable from './DetailTable';

function BankPaymentTable({ setSelectedRecordId, setActiveTab, setSelectedRecordDetailId, refetch, isLoading }: TFrom) {
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
          <AntButton onClick={toggleCardView} className="" label={t('card_view')} />
          <AntButton onClick={toggleGridView} className="" style={{ marginLeft: '0.2%' }} label={t('grid_view')} />
        </Col>

        {showComponent ? (
          <CardView />
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

type TFrom = {
  setSelectedRecordId: (id: number | null) => void;
  setActiveTab: (tab: string) => void;
  setSelectedRecordDetailId: (id: number | null) => void;
  refetch: any;
  isLoading: any;
};

export default BankPaymentTable;
