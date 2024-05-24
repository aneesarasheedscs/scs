import { AntButton, AntTable } from '@scs/ui';
import { useGetBookingOrder, useGetPurchaseOrderStatus } from '../queries';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Bookingordercolumns } from './columns';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row } from 'antd';

import { useState } from 'react';
import CardView from './cardView';
import './Card.scss';
import './DetailTableFile.scss';
import SaleOrderFormHistoryCriteria from './SaleOrderHistoryCriteria';
import { map } from 'lodash';
import ModalCriteria from './HistoryCriteria';

const BookingOrderTable = ({ setSelectedRecordId, setActiveTab }: TFrom) => {
  const { t } = useTranslation();
  const { data, refetch, isError, isLoading, isFetching } = useGetBookingOrder(true);
  console.log('sale order', data?.data?.Data?.Result);

  const [showComponent, setShowComponent] = useState(false);

  const toggleGridView = () => {
    setShowComponent(false);
  };
  const toggleCardView = () => {
    setShowComponent(true);
  };
  function CriteriaString() {
    return (
      <Row style={{ border: '1px solid #25A7DF', padding: 7, borderRadius: 5 }}>
        <h5> {data?.data?.Data?.Result?.[0]?.ReportCriteria}</h5>
      </Row>
    );
  }

  const { data: purchaseOrderStatus } = useGetPurchaseOrderStatus();

  return (
    <>
      <Row gutter={10}>
        {/* <Col span={24} style={{ marginLeft: '0.1%', borderTop: '1px solid #dfdfdf' }}>
          <Row>
            <Col xxl={4}>
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
            <Col xxl={20} style={{marginLeft:-10}}>
              {' '}
              <PurchaseOrderStatus />
            </Col>
          </Row>
        </Col> */}

        <Col xl={24}>
          {/* <PurchaseOrderStatus /> */}
          <ModalCriteria />
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
            <Col xxl={14} style={{ marginLeft: -2, marginTop: 5 }}>
              <AntTable
                refetch={refetch}
                isError={isError}
                columns={Bookingordercolumns(t)}
                numberOfSkeletons={12}
                // searchCriteriaForm={<SaleOrderFormHistoryCriteria />}
                searchCriteriaReport={data?.data?.Data?.Result?.ReportCriteria ? <CriteriaString /> : ''}
                isLoading={isLoading || isFetching}
                data={data?.data?.Data?.Result || []}
                scroll={{ x: '', y: convertVhToPixels('26vh') }}
              />
            </Col>
          )}
        </Col>
      </Row>
    </>
  );
};
type TFrom = {
  setSelectedRecordId: (id: number | null) => void;
  setActiveTab: (tab: string) => void;
};

export default BookingOrderTable;
