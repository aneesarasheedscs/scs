import { ReactNode } from 'react';
import { Row, Col, Card } from 'antd';
import ERPLogo from './Images/Eccountbook Logo.png';

function CardWrapper({ children }: { children: ReactNode }) {
  return (
    <Row justify="center" align="middle" className="login-container">
      <Row justify="center" style={{ width: '100%', padding: '0px 15px 0px 15px' }}>
        <Col xs={24} sm={24} md={16} lg={12} xl={8} xxl={8}>
          <Card className="login-card">
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <h1 style={{ textAlign: 'center', marginBottom: -20 }}>
                <img src={ERPLogo} width={'70%'} height={'60%'} style={{ marginTop: '-2%' }} />
              </h1>
              <h2>Welcome to ERP</h2>
            </div>

            {children}
          </Card>
        </Col>
      </Row>
    </Row>
  );
}

export default CardWrapper;
