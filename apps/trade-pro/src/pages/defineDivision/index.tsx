import { Col, Row } from 'antd';
import Division from './forms/division/division';
import District from './forms/district/district';
import Tehsil from './forms/tehsil/tehsil';
import Town from './forms/town/town';

function DefineDivision() {
  return (
    <>
      <div style={{ marginLeft: '6%' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={20} lg={20} xl={12}>
            <Division />
          </Col>
          <Col xs={24} sm={24} md={20} lg={20} xl={12}>
            <District />
          </Col>
          <Col xs={24} sm={24} md={20} lg={20} xl={12}>
            <Tehsil />
          </Col>
          <Col xs={24} sm={24} md={20} lg={20} xl={12}>
            <Town />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DefineDivision;
