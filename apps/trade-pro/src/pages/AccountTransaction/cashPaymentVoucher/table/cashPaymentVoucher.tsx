import { AntButton, AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Col, Row, theme } from 'antd';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import { useGetCashPaymentVoucherTable } from '../queries/queries';
import { useState } from 'react';
import CardView from './CardView';
import './Card.scss';
import './Table.scss';
import CashPaymentDetailTable from './DetailTable';

function CashPaymentTable({ setSelectedRecordId, setActiveTab }: TFrom) {
  const { t } = useTranslation();
  const { data, isError, isLoading, refetch, isFetching } = useGetCashPaymentVoucherTable();
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
          <AntButton onClick={toggleCardView} className="" label={t('card_view')} />
          <AntButton onClick={toggleGridView} className="" style={{ marginLeft: '0.2%' }} label={t('grid_view')} />
        </Col>

        {showComponent ? (
          <CardView />
        ) : (
          <Col>
            <>
              <AntTable
                refetch={refetch}
                isError={isError}
                numberOfSkeletons={8}
                isLoading={isLoading || isFetching}
                scroll={{ x: '', y: convertVhToPixels('25vh') }}
                data={data?.data?.Data?.Result || []}
                columns={columns(t, setSelectedRecordId, setActiveTab)}
              />

              <CashPaymentDetailTable />
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
};

export default CashPaymentTable;
