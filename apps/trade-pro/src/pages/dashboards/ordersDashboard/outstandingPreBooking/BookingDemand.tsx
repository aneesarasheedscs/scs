import { Col, Row, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import BookingOrderSatus from '../table/ordersDashboardStatus';
import {
  CustomerAndItemTable,
  CustomerTable,
  ItemAndCustomerTable,
  ItemAndPackTable,
  ItemTable,
  PackAndItemTable,
} from '../table/outstandingOrderTables';

function BookingDemand({ bookingDemandData, isLoading, isFetching }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <Row>
        <Col span={24}>
          <Col span={24}>{<BookingOrderSatus bookingDemandData={bookingDemandData} />}</Col>
          <Tabs type="card" size="large" className="tabs-margin-bottom-0">
            <Tabs.TabPane key="1" tab={t('item')}>
              <ItemTable data={bookingDemandData?.Table1} isLoading={isLoading} isFetching={isFetching} />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab={t('customer')}>
              <CustomerTable data={bookingDemandData?.Table2} isLoading={isLoading} isFetching={isFetching} />
            </Tabs.TabPane>
            <Tabs.TabPane key="3" tab={t('item_pack')}>
              <ItemAndPackTable data={bookingDemandData?.Table3} isLoading={isLoading} isFetching={isFetching} />
            </Tabs.TabPane>
            <Tabs.TabPane key="4" tab={t('pack_item')}>
              <PackAndItemTable data={bookingDemandData?.Table3} isLoading={isLoading} isFetching={isFetching} />
            </Tabs.TabPane>
            <Tabs.TabPane key="5" tab={t('item_customer')}>
              <ItemAndCustomerTable data={bookingDemandData?.Table4} isLoading={isLoading} isFetching={isFetching} />
            </Tabs.TabPane>
            <Tabs.TabPane key="6" tab={t('customer_item')}>
              <CustomerAndItemTable data={bookingDemandData?.Table4} isLoading={isLoading} isFetching={isFetching} />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}

export default BookingDemand;
interface Props {
  bookingDemandData: any;
  isLoading: boolean;
  isFetching: boolean;
}
