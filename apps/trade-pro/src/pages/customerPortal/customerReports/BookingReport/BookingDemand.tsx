import { Col, Row, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  CustomerAndItemTable,
  CustomerTable,
  ItemAndCustomerTable,
  ItemAndPackTable,
  ItemTable,
  PackAndItemTable,
} from './BookingReportTable';
import BookingOrderSatus from './BookingStatus';
import { useGetBookingReport } from './queries';
import SearchCriteria from './searchCriteria';

function BookingReport() {
  const { t } = useTranslation();
  const { data, isLoading, isFetching, isError } = useGetBookingReport();

  return (
    <>
      <Row gutter={[4, 10]} justify={'center'} style={{ background: '#fff' }}>
        <Col span={23}>
          <Col span={24} style={{ marginBottom: 10 }}>
            <h1 className="report_heading">{t('booking_reports')}</h1>
          </Col>
          <Col span={24} style={{ marginBottom: 15 }}>
            <SearchCriteria />
          </Col>
          <Col span={24} style={{ marginBottom: 15 }}>
            {<BookingOrderSatus bookingDemandData={data?.data?.Data?.Result} />}
          </Col>
          <Col xxl={17} xl={22}>
            <Tabs type="card" size="large" className="tabs-margin-bottom-0">
              <Tabs.TabPane key="1" tab={t('item')}>
                <ItemTable
                  data={data?.data?.Data?.Result?.Table1}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  isError={isError}
                />
              </Tabs.TabPane>
              <Tabs.TabPane key="2" tab={t('customer')}>
                <CustomerTable
                  data={data?.data?.Data?.Result?.Table2}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  isError={isError}
                />
              </Tabs.TabPane>
              <Tabs.TabPane key="3" tab={t('item_pack')}>
                <ItemAndPackTable
                  data={data?.data?.Data?.Result?.Table3}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  isError={isError}
                />
              </Tabs.TabPane>
              <Tabs.TabPane key="4" tab={t('pack_item')}>
                <PackAndItemTable
                  data={data?.data?.Data?.Result?.Table3}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  isError={isError}
                />
              </Tabs.TabPane>
              <Tabs.TabPane key="5" tab={t('item_customer')}>
                <ItemAndCustomerTable
                  data={data?.data?.Data?.Result?.Table4}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  isError={isError}
                />
              </Tabs.TabPane>
              <Tabs.TabPane key="6" tab={t('customer_item')}>
                <CustomerAndItemTable
                  data={data?.data?.Data?.Result?.Table4}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  isError={isError}
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Col>
      </Row>
    </>
  );
}

export default BookingReport;
