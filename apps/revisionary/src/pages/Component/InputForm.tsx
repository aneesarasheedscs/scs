import { Col, Input, Row } from 'antd';
import React from 'react';

export default function InputForm() {
  return (
    <div>
      <Row gutter={120}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Input size="large" required style={{ width: '150%' }} placeholder="Code" />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <Input size="large" required style={{ width: '140%' }} placeholder="Name" />
        </Col>
      </Row>
    </div>
  );
}
