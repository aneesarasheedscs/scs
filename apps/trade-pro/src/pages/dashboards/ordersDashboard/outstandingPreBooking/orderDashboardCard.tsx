// import { Card, Col, Modal, Row, Tabs, theme } from 'antd';
// import { map } from 'lodash';
// import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import SearchCriteria from './searchCriteria';
// import { ArrowRightOutlined } from '@ant-design/icons';
// import OrdersDashboardStatus from '../table/ordersDashboardStatus';
// import ModalCriteria from '../table/modalCriteria';
// import { useGetOrdersDashboard, useGetPreBookingTablesData } from '../quries';
// import { CustomerTable, ItemAndPackTable, ItemTable, PackAndItemTable } from '../table/outstandingOrderTables';

// const { useToken } = theme;

// const OrderDashboardCard = () => {
//   const { t } = useTranslation();
//   const {
//     token: { colorPrimary },
//   } = theme.useToken();
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
// const {data} =useGetOrdersDashboard();
// const {data:tableData} = useGetPreBookingTablesData()
//   const dummyData = [
//     {
//       Id: 1,
//       Module: 1,
//       Desc: 'Outstanding Pre Booking',
//     },
//     {
//       Id: 2,
//       Module: 2,
//       Desc: 'Outstanding Pre Booking',
//     },
//     {
//       Id: 2,
//       Module: 10,
//       Desc: 'Outstanding Pre Booking',
//     },
//     {
//       Id: 2,
//       Module: 2,
//       Desc: 'Outstanding Pre Booking',
//     },
//     {
//       Id: 2,
//       Module: 62,
//       Desc: 'Outstanding Pre Booking',
//     },
//     {
//       Id: 2,
//       Module: 2,
//       Desc: 'Outstanding Pre Booking',
//     },
//     {
//       Id: 30,
//       Module: 2,
//       Desc: 'Outstanding Pre Booking',
//     },
//   ];

//   const showModal = (index: any) => {
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };
//   return (
//     <Row justify={'space-around'} style={{ marginTop: 10 }}>
//       <Col xxl={23} xl={23} sm={23} xs={23} lg={23}>
//         <Row justify={'center'} gutter={[10, 24]} style={{}}>
//           {map(data?.data?.Data?.Result, (item, index) => (
//             <Col xs={24} xxl={3} sm={12} md={11} lg={6} xl={6} key={index} style={{}}>
//               <Card
//                 hoverable
//                 className="container_menuCard"
//                 cover={
//                   <div>
//                     <div
//                       className="menu_icon_div"
//                       style={
//                         {
//                           // color: colorPrimary,
//                           // border:'1px solid',
//                           // width:'100%'
//                         }
//                       }
//                     >
//                       {/* {defaultIcons[index % defaultIcons.length]}
//                        */}
//                       {item.Total}
//                     </div>
//                     <p
//                       className="menu_desc"
//                       style={{
//                         backgroundColor: colorPrimary,
//                         borderBottomRightRadius: 10,
//                         marginTop: 5,
//                         borderBottomLeftRadius: 10,
//                       }}
//                     >
//                       <h5
//                         style={{
//                           // display: 'flex',
//                           // alignItems: 'center',
//                           // justifyContent: 'center',
//                           padding: 5,

//                           marginTop: -25,
//                           // fontWeight: 'bold',
//                           color: 'white',
//                         }}
//                       >
//                         {item.Activity}{' '}
//                         <ArrowRightOutlined
//                           style={{  fontWeight: 'bold' }}
//                           onClick={() => showModal(index)}
//                         />
//                       </h5>
//                     </p>
//                   </div>
//                 }
//               ></Card>
//             </Col>
//           ))}
//         </Row>
//       </Col>

//       <Modal
//         //   title={childrenList?.[0]?.ModuleDescription}
//         open={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         width={'90%'}
//         footer={null}
//       >
//         <Card bordered={false}>
//           <Row className="firstTitle1">
//             <Col span={24}>
//               <h2>{t('outstanding_pre_booking_order')}</h2>
//             </Col>
//           </Row>
//           <ModalCriteria />

//           <Tabs
//             type="card"
//             size="large"
//             // activeKey={activeTab}
//             className="tabs-margin-bottom-0"
//             // onChange={(key) => setActiveTab(key)}
//           >
//             <Tabs.TabPane key="1" tab={t('item')}>
//               <ItemTable data={tableData}/>
//             </Tabs.TabPane>
//             <Tabs.TabPane key="2" tab={t('customer')}>
//               <CustomerTable data={tableData} />
//             </Tabs.TabPane>
//             <Tabs.TabPane key="3" tab={t('item_pack')}>
//               <ItemAndPackTable data={tableData}  />
//             </Tabs.TabPane>
//             <Tabs.TabPane key="4" tab={t('pack_item')}>
//               <PackAndItemTable data={tableData}  />
//             </Tabs.TabPane>
//           </Tabs>

          
//         </Card>
//       </Modal>
//     </Row>
//   );
// };
// export default OrderDashboardCard;






import React, { useState } from 'react';
import { Card, Col, Row, Tabs, theme } from 'antd';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useGetOrdersDashboard, useGetPreBookingTablesData } from '../quries';
import { CustomerTable, ItemAndPackTable, ItemTable, PackAndItemTable } from '../table/outstandingOrderTables';
import ModalCriteria from '../table/modalCriteria';
import BookingOrderSatus from '../table/ordersDashboardStatus';


const { useToken } = theme;

const OrderDashboardCard = () => {
  const { t } = useTranslation();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const { data } = useGetOrdersDashboard();
  const { data: tableData } = useGetPreBookingTablesData();
  const [selectedItem, setSelectedItem] = useState<any>(null); // State to manage selected item

  const handleClick = (item: any) => {
    setSelectedItem(item);
  };

  return (
    <Row justify={'space-around'} style={{ marginTop: 10 }}>
  <Col xxl={15} style={{marginLeft:'-35%'}}>
  <Col xxl={24} xl={23} sm={23} xs={23} lg={23} >
        <Row justify={'start'} gutter={[10, 24]} style={{}}>
          {map(data?.data?.Data?.Result, (item, index) => (
            <Col xs={24} xxl={5} sm={12} md={11} lg={6} xl={6} key={index}>
              <Card
                hoverable
                className="container_menuCard"
                cover={
                  <div>
                    <div className="menu_icon_div">
                      {item.Total}
                    </div>
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
  </Col>

      {selectedItem && (
        <Col span={23} >
          <div style={{ marginTop: '20px' }}>
            <h3 style={{paddingTop:20,}} className='report_heading'>{selectedItem.Activity}</h3>
            {/* <ModalCriteria /> */}
          <Col xxl={10}>
            {selectedItem.Activity === 'OutstandingBookingOrders' ? <BookingOrderSatus />:'' }
         
          </Col>
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
      )}
    </Row>
  );
};

export default OrderDashboardCard;
