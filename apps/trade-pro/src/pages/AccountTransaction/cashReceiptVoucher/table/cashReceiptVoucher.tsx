import { AntButton, AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Col, Row, theme } from 'antd';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import { useGetCashReceiptVoucherTable } from '../queries/queries';
import { useState } from 'react';
import './Card.scss';
import './DetailTableFile.scss';
import CardView from './CardView';

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
      <Row style={{ marginTop: '0.5%' }}>
        <Col span={24}>
          <AntButton onClick={toggleCardView} className="btn" label={t('card_view')} />
          <AntButton onClick={toggleGridView} className="btn" style={{ marginLeft: '1%' }} label={t('grid_view')} />
        </Col>
        <br />
        <br />
        {showComponent ? (
          <CardView />
        ) : (
          <Col>
            <div>
              <AntTable
                isError={isError}
                numberOfSkeletons={8}
                isLoading={isLoading}
                scroll={{ x: '', y: convertVhToPixels('25vh') }}
                data={data?.data?.Data?.Result || []}
                columns={columns(t, setSelectedRecordId, setActiveTab)}
              />

              <Col>{/* <CashReceiptDetailTable /> */}</Col>
            </div>
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
