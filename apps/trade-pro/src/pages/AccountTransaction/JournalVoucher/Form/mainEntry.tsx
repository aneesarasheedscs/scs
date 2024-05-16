import React from 'react';
import { AntButton, AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Checkbox, Col, Row } from 'antd';
import '../../style.scss';

function MainEntryForm() {
  return (
    <div className="contravoucher-main">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card style={{ height: '110%' }} className="antCard card-shadow contraVoucher">
            <h3>Main:</h3>
            <br />
            <div className="form-list-container">
              <Row gutter={[16, 16]}>
                <Col xs={22} sm={22} md={22} lg={11} xl={{ span: 10, offset: 0 }} className="formfield">
                  <AntDatePicker label="Doc Date" bordered={false} className="select" name={''} />
                </Col>
                <Col
                  xs={22}
                  sm={22}
                  md={22}
                  lg={{ span: 10, offset: 1 }}
                  xl={{ span: 10, offset: 3 }}
                  className="formfield"
                >
                  <AntSelectDynamic
                    label="Doc No"
                    bordered={false}
                    className="select"
                    fieldValue=""
                    fieldLabel=""
                    name={''}
                  />
                </Col>
                <Col xs={22} sm={22} md={22} lg={20} xl={{ span: 20, offset: 0 }} className="formfield">
                  <AntInput label="Remarks" className="select" bordered={false} name={''} />
                </Col>
                <Col xs={22} sm={22} md={24} lg={0} xl={4} style={{ marginTop: '5%' }}>
                  <Checkbox>Preview</Checkbox>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default MainEntryForm;
