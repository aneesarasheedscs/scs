import React from 'react';
import { AntButton, AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Checkbox, Col, Row } from 'antd';
import '../../style.scss';

function Form() {
  return (
    <div className="contravoucher-main">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card style={{ height: 'auto' }} className="antCard card-shadow contraVoucher">
            <h3>Main:</h3>
            <br />
            <div className="form-list-container">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="formfield">
                  <AntDatePicker label="Doc Date" bordered={false} className="select" name={''} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="formfield">
                  <AntSelectDynamic
                    label="Doc No"
                    bordered={false}
                    className="select"
                    fieldValue=""
                    fieldLabel=""
                    name={''}
                  />
                </Col>
                <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                  <AntInput label="Remarks" className="select" style={{ height: '8.7vh' }} name={''} />
                </Col>
                <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                  <Checkbox>Preview</Checkbox>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card style={{ height: 'auto' }} className="antCard card-shadow contraVoucher">
            <h3>Detail:</h3>
            <br />
            <div className="form-list-container">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="formfield">
                  <AntSelectDynamic
                    label="Credit Account"
                    bordered={false}
                    className="select"
                    fieldValue=""
                    fieldLabel=""
                    name={''}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="formfield">
                  <AntSelectDynamic
                    label="Debit Account"
                    bordered={false}
                    className="select"
                    fieldValue=""
                    fieldLabel=""
                    name={''}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="formfield">
                  <AntInput label="Credit Comments" className="input" bordered={false} style={{ width: '100%' }} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="formfield">
                  <AntInput label="Debit Comments" className="input" bordered={false} style={{ width: '100%' }} />
                </Col>
                <Col xs={24} sm={24} md={3} lg={3} xl={3} offset={11}>
                  <AntButton label="+" />
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Form;
