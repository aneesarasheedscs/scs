import { Card, Col, Row } from 'antd';
import { useGetPurchaseOrderStatus } from '../queries';
import { map } from 'lodash';

function PurchaseOrderStatus() {
  const { data: purchaseOrderStatus } = useGetPurchaseOrderStatus();

  return (
    <>
      {/* <Card style={{height:'12vh'}}> */}
      <Row gutter={6} justify={'end'}>
        {map(purchaseOrderStatus?.data?.Data?.Result, (heading, index) => (
          <Col xxl={3} xl={4} lg={6} md={5} sm={7} xs={12} key={index}>
            <Card
              className="purchase-cards"
              cover={
                <h4 style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="">{heading.Activity}</span>
                  <span className="">{heading.OrderStatus}</span>
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

export default PurchaseOrderStatus;
