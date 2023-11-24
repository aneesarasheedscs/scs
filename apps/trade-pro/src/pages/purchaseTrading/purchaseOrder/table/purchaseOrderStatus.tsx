import { Card, Col, Row } from 'antd';
import { useGetPurchaseOrderStatus } from '../queries';
import { map } from 'lodash';

function PurchaseOrderStatus() {
  const { data: purchaseOrderStatus } = useGetPurchaseOrderStatus();

  return (
    <>
      <Card style={{ marginBottom: 5 }}>
        <Row gutter={10}>
          {map(purchaseOrderStatus?.data?.Data?.Result, (heading, index) => (
            <Col xl={6} xs={6} key={index}>
              <Card
                className="purchase-cards"
                cover={
                  <h3>
                    <span>{heading.Activity}</span>
                  </h3>
                }
              >
                <h3 style={{ fontSize: 20, textAlign: 'center' }}>{heading.OrderStatus}</h3>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
}

export default PurchaseOrderStatus;
