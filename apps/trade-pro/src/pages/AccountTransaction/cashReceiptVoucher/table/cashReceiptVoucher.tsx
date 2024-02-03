import './Card.scss';
import './DetailTableFile.scss';
import CardView from './CardView';
import { useState } from 'react';
import { Col, Row, theme } from 'antd';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import { AntButton, AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetCashReceiptVoucherTable } from '../queries/queries';

function CashReceiptTable({ setSelectedRecordId, setActiveTab }: TFrom) {
  const { t } = useTranslation();
  const { data, isError, isLoading } = useGetCashReceiptVoucherTable();
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
                isError={isError}
                numberOfSkeletons={10}
                isLoading={isLoading}
                scroll={{ x: '', y: convertVhToPixels('25vh') }}
                data={data?.data?.Data?.Result || []}
                columns={columns(t, setSelectedRecordId, setActiveTab)}
              />

              {/* <CashReceiptDetailTable />  */}
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

export default CashReceiptTable;
