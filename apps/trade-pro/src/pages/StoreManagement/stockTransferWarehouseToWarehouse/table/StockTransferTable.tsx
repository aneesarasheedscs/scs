import { AntButton, AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, Row, theme } from 'antd';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import { useGetStockTransferHistory } from '../quries';
import { useState } from 'react';
import CardView from './cardView';
import StockTransferDetailTable from './DetailTable';

function StockTransferTable({ setSelectedRecordId, setActiveTab }: TFrom) {
  const { t } = useTranslation();
  const [showComponent, setShowComponent] = useState(false);

  const toggleGridView = () => {
    setShowComponent(false);
  };
  const toggleCardView = () => {
    setShowComponent(true);
  };
  const { data, isError, isLoading, refetch, isFetching } = useGetStockTransferHistory();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <div>
      <Row style={{ marginTop: '' }}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={24}>
          <h2 className="form-heading2">
            <Row gutter={10} style={{ display: 'flex' }}>
              <div style={{ display: 'flex' }}>
                <AntButton onClick={toggleGridView} className="btn" label="Grid View" />

                <AntButton onClick={toggleCardView} className="btn" label="Card View" style={{ marginLeft: '2%' }} />
              </div>
            </Row>
          </h2>
          <div>
            {showComponent ? (
              <CardView setActiveTab={setActiveTab} setSelectedRecordId={setSelectedRecordId} />
            ) : (
              <>
                <AntTable
                  refetch={refetch}
                  isError={isError}
                  numberOfSkeletons={8}
                  isLoading={isLoading}
                  scroll={{ x: '', y: convertVhToPixels('30vh') }}
                  data={data?.data?.Data?.Result || []}
                  columns={columns(t, setSelectedRecordId, setActiveTab)}
                />
                <StockTransferDetailTable />
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

type TFrom = {
  setSelectedRecordId: (id: number | null) => void;
  setActiveTab: (tab: string) => void;
};

export default StockTransferTable;
