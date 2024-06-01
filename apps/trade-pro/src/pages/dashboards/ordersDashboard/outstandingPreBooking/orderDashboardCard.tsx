import React, { useState } from 'react';
import { Card, Col, Row, Tabs, theme } from 'antd';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';
import { ArrowRightOutlined } from '@ant-design/icons';
import {
  useGetOrdersDashboardStatus,
  useGetOrdersDashboardforBookingDemand,
  useGetPreBookingOutStandingOrdersDashboard,
} from '../quries';
import PendingOrders from './pendingOrders';
import DeliveryInTransit from './deliveryInTransit';
import BookingDemand from './bookingDemand';
import SalesBill from './SalesBill';
import SearchCriteria from './searchCriteria';

const OrderDashboardCard = () => {
  const { t } = useTranslation();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const { data } = useGetOrdersDashboardStatus();

  const { data: pendingOrdersData } = useGetPreBookingOutStandingOrdersDashboard();
  const { data: bookingDemandData } = useGetOrdersDashboardforBookingDemand();
  const [selectedItem, setSelectedItem] = useState<any>(null); // State to manage selected item

  const handleClick = (item: any) => {
    setSelectedItem(item);
  };

  return (
    <Row gutter={[10, 0]} justify={'space-between'} style={{ marginTop: 0, marginLeft: 0 }}>
      <Col xxl={6} xl={24} lg={24} md={24} sm={24}>
        <Row>
          <Col span={24}>
            <SearchCriteria />
          </Col>
          <Col span={24}>
            <Row justify={'start'} gutter={[0, 4]} style={{ marginTop: 10 }}>
              {map(data?.data?.Data?.Result, (item, index) => (
                <Col xs={24} xxl={18} sm={12} md={6} lg={6} xl={5} key={index}>
                  <Card
                    hoverable
                    className="container_menuCard"
                    cover={
                      <div>
                        <div className="menu_icon_div">{item.Total}</div>
                        <p
                          className="menu_desc"
                          style={{
                            backgroundColor: colorPrimary,
                            borderBottomRightRadius: 10,
                            marginTop: 5,
                            borderBottomLeftRadius: 10,
                          }}
                        >
                          <h5
                            style={{
                              padding: 5,
                              marginTop: -25,
                              color: 'white',
                            }}
                          >
                            {item.Activity}{' '}
                            <ArrowRightOutlined
                              style={{ fontWeight: 'bold', cursor: 'pointer' }}
                              onClick={() => handleClick(item)}
                            />
                          </h5>
                        </p>
                      </div>
                    }
                  ></Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Col>

      {selectedItem?.Activity === 'Booking / Demand' ? (
        <Col xxl={18} xl={20}>
          <div>
            <h3 style={{ paddingTop: 0 }} className="report_heading">
              {selectedItem.Activity}
            </h3>

            <BookingDemand bookingDemandData={bookingDemandData?.data?.Data?.Result} />
          </div>
        </Col>
      ) : selectedItem?.Activity === 'Pending Orders' ? (
        <Col xxl={18} xl={20}>
          <div>
            <h3 style={{ paddingTop: 0 }} className="report_heading">
              {selectedItem.Activity}
            </h3>

            <PendingOrders pendingOrdersData={pendingOrdersData?.data?.Data?.Result} />
          </div>
        </Col>
      ) : selectedItem?.Activity === 'Delivery In Transit' ? (
        <Col xxl={18} xl={20}>
          <div>
            <h3 style={{ paddingTop: 0 }} className="report_heading">
              {selectedItem.Activity}
            </h3>

            <DeliveryInTransit />
          </div>
        </Col>
      ) : selectedItem?.Activity === 'Sales Bill' ? (
        <Col xxl={18} xl={20}>
          <div>
            <h3 style={{ paddingTop: 0 }} className="report_heading">
              {selectedItem.Activity}
            </h3>

            <SalesBill />
          </div>
        </Col>
      ) : (
        ''
      )}
      {/* {selectedItem && (
        <Col xxl={14} xl={20} style={{}}>
          <div style={{ marginTop: '0px', marginLeft: 10 }}>
            <h3 style={{ paddingTop: 0 }} className="report_heading">
              {selectedItem.Activity}
            </h3>
              <Tabs type="card" size="large" className="tabs-margin-bottom-0">
              <Tabs.TabPane key="1" tab={t('item')}>
                <ItemTable data={tableData} />
              </Tabs.TabPane>
              <Tabs.TabPane key="2" tab={t('customer')}>
                <CustomerTable data={tableData} />
              </Tabs.TabPane>
              <Tabs.TabPane key="3" tab={t('item_pack')}>
                <ItemAndPackTable data={tableData} />
              </Tabs.TabPane>
              <Tabs.TabPane key="4" tab={t('pack_item')}>
                <PackAndItemTable data={tableData} />
              </Tabs.TabPane>
               
            </Tabs>
          </div>
        </Col>
      )} */}
    </Row>
  );
};

export default OrderDashboardCard;
