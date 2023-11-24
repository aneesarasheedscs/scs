import { Col, Row } from 'antd';
import JobLots from './JobLot';

function DefineJobLots() {
  return (
    <>
      <div style={{ marginLeft: '10%', width: '70vw' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={20} lg={20} xl={12}>
            <JobLots />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DefineJobLots;
