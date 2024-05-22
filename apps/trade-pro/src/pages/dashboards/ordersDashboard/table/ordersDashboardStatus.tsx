import { Card, Col, Row } from 'antd';
// import { useGetPurchaseOrderStatus } from '../queries';
import { map } from 'lodash';
import { useGetPreBookingTablesData } from '../quries';
import { useTranslation } from 'react-i18next';

function BookingOrderSatus({}) {
  const {data,refetch} = useGetPreBookingTablesData(true,null)
const {t} =useTranslation()
  // const {data} = useGetPreBookingTablesData()
  const TotalCustomer = data?.data?.Data?.Result?.Table?.TotalCustomers
  const TotalQty = data?.data?.Data?.Result?.Table?.Qty
  const TotalWeight = data?.data?.Data?.Result?.Table?.Weight
  const TotalAmount = data?.data?.Data?.Result?.Table?.Amount
  console.log(TotalCustomer,'toal')
const BookingOrderSatus =  [
  {
    Id:1,
    text:'Customer',
    status:101,
  },
  {
    Id:2,
    text:'Qty',
    status:101,
  },
  {
    Id:3,
    text:'Weight',
    status:101,
  },
  {
    Id:4,
    text:'Amount',
    status:101,
  }
]
const cardColors = ['#ff9999', '#99ff99', '#9999ff', '#ffff99'];
  return (
    <>
      {/* <Card style={{height:'12vh'}}> */}
      <Row gutter={0} justify={'end'}>
        {/* {map(BookingOrderSatus, (heading, index) => ( */}
          <Col xxl={4} xl={4} lg={6} md={5} sm={7} xs={12} >
            <Card
              className="purchase-cards"

              
              cover={
                <h4 style={{ display: 'flex', justifyContent: 'space-between' ,padding:'5px',marginTop:-3}}>
                  <span className="">{t('customer')}</span>
                  <span className="">{TotalCustomer}</span>
                </h4>
              }
            ></Card>
          </Col>
          <Col xxl={4} xl={4} lg={6} md={5} sm={7} xs={12} >
            <Card
              className="purchase-cards"

              
              cover={
                <h4 style={{ display: 'flex', justifyContent: 'space-between' ,padding:'5px',marginTop:-3}}>
                  <span className="">{t('qty')}</span>
                  <span className="">{TotalQty}</span>
                </h4>
              }
            ></Card>
          </Col>
          <Col xxl={4} xl={4} lg={6} md={5} sm={7} xs={12} >
            <Card
              className="purchase-cards"

              
              cover={
                <h4 style={{ display: 'flex', justifyContent: 'space-between' ,padding:'5px',marginTop:-3}}>
                  <span className="">{t('weight')}</span>
                  <span className="">{TotalWeight}</span>
                </h4>
              }
            ></Card>
          </Col>
          <Col xxl={4} xl={4} lg={6} md={5} sm={7} xs={12} >
            <Card
              className="purchase-cards"

              
              cover={
                <h4 style={{ display: 'flex', justifyContent: 'space-between' ,padding:'5px',marginTop:-3}}>
                  <span className="">{t('amount')}</span>
                  <span className="">{TotalAmount}</span>
                </h4>
              }
            ></Card>
          </Col>
        {/* ))} */}
      </Row>

      {/* </Card> */}
    </>
  );
}

export default BookingOrderSatus;
