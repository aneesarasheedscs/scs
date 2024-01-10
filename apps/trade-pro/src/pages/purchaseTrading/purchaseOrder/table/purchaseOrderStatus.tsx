import { Card, Col, Row } from 'antd';
import { useGetPurchaseOrderStatus } from '../queries';
import { map } from 'lodash';

function PurchaseOrderStatus() {
  const { data: purchaseOrderStatus } = useGetPurchaseOrderStatus();

  return (
    <>
      <Card style={{ marginBottom: 5 }}>
        <Row gutter={6}>
          {map(purchaseOrderStatus?.data?.Data?.Result, (heading, index) => (
            <Col xl={6} xs={6} key={index}>
              <Card
                className="purchase-cards"
                cover={
                  <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="purchase_span">{heading.Activity}</span>
                    <span className="purchase_span_status">{heading.OrderStatus}</span>
                  </h3>
                }
              ></Card>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
}

export default PurchaseOrderStatus;
