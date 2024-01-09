import { columns } from './columns';
import { AntButton, AntTable } from '@tradePro/components';
import { useGetPurchaseOrder, useGetPurchaseOrderStatus } from '../queries';
import SearchCriteriaFrom from './SearchCriteriaForm';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row, theme } from 'antd';
import PurchaseOrderStatus from './purchaseOrderStatus';
import { useState } from 'react';
import CardView from './cardView';
import { relative } from 'path';

const { useToken } = theme;
interface TPurchaseTypes {
  setSelectedRecordId: (selectedRecordId: number) => void;
  setActiveTab: (tab: string) => void;
}
function PurchaseOrderTable({ setSelectedRecordId, setActiveTab }: TPurchaseTypes) {
  const { t } = useTranslation();
  const { data, refetch, isError, isLoading, isFetching } = useGetPurchaseOrder();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [showComponent, setShowComponent] = useState(false);

  const toggleGridView = () => {
    setShowComponent(false);
  };
  const toggleCardView = () => {
    setShowComponent(true);
  };

  return (
    <>
      <PurchaseOrderStatus />
      <Row className="main">
        <Col xl={24}>
          <Row justify={'end'}>
            <Col>
              <AntButton label={t('grid_view')} onClick={toggleGridView} className="toggle_button" />
            </Col>
            <Col>
              <AntButton label={t('card_view')} onClick={toggleCardView} className="toggle_button2" />
            </Col>
          </Row>
          {showComponent ? (
            <>
              <Card
                cover={
                  <>
                    <CardView setActiveTab={setActiveTab} setSelectedRecordId={setSelectedRecordId} />
                  </>
                }
              ></Card>
            </>
          ) : (
            <>
              <AntTable
                rowKey="Id"
                refetch={refetch}
                isError={isError}
                columns={columns(t, setSelectedRecordId, setActiveTab)}
                numberOfSkeletons={12}
                isLoading={isLoading || isFetching}
                data={data?.data?.Data?.Result || []}
                searchCriteriaForm={<SearchCriteriaFrom />}
                scroll={{ x: '', y: convertVhToPixels('60vh') }}
              />
            </>
          )}
        </Col>
      </Row>
    </>
  );
}

export default PurchaseOrderTable;
