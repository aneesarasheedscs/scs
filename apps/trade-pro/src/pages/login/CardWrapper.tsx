import { ReactNode } from 'react';
import { Row, Col, Card } from 'antd';

function CardWrapper({ children }: { children: ReactNode }) {
  return (
    <Row justify="center" align="middle" className="login-container">
      <Row justify="center" style={{ width: '100%', padding: '0px 15px 0px 15px' }}>
        <Col xs={24} sm={24} md={16} lg={12} xl={8} xxl={8}>
          <Card className="login-card">
            <div style={{ textAlign: 'center', marginBottom: 30 }}>
              <h1>TradePro</h1>
            </div>

            {children}
          </Card>
        </Col>
      </Row>
    </Row>
  );
}

export default CardWrapper;
