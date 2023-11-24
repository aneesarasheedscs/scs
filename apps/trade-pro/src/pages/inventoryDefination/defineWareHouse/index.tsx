import { Col, Row } from 'antd';
import WareHouse from './WareHouse';

function DefineWareHouse() {
  return (
    <>
      <div style={{ marginLeft: '10%', width: '70vw' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={20} lg={20} xl={12}>
            <WareHouse />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DefineWareHouse;
