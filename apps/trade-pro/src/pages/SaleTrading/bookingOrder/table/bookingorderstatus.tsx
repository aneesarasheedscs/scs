import { Card, Col, Row } from 'antd';
// import { useGetPurchaseOrderStatus } from '../queries';
import { map } from 'lodash';
import { useGetBookingOrderStatus } from './queries';

function OrdersDashboardStatus() {
  const { data: bookingOrder } = useGetBookingOrderStatus();

  // const {data} = useGetPreBookingTablesData()
  // const TotalCustomer = data?.data?.Data?.Result?.Table1?.length
  // console.log(TotalCustomer,'toal')
const OrdersDashboardStatus =  [
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
        {map(OrdersDashboardStatus, (heading, index) => (
          <Col xxl={4} xl={4} lg={6} md={5} sm={7} xs={12} key={index}>
            <Card
              className="purchase-cards"

              
              cover={
                <h4 style={{ display: 'flex', justifyContent: 'space-between' ,padding:'5px',marginTop:-3}}>
                  <span className="">{heading.text}</span>
                  <span className="">{heading.status}</span>
                </h4>
              }
            ></Card>
          </Col>
        ))}
      </Row>

      {/* </Card> */}
    </>
  );
}

export default OrdersDashboardStatus;
