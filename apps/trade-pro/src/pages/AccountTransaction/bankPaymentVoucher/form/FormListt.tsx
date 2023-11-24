import { AntButton, AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@scs/ui';
import { Card, Col, Row, Form, FormInstance, Checkbox } from 'antd';
import { add, remove, size } from 'lodash';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import FormList from 'antd/es/form/FormList';
import { useGetBankPaymentTax } from '../queries/queries';

const { useWatch } = Form;

const FormListt = ({ form }: FormListt) => {
  const formValues = useWatch<any[]>('purchaseOrderDetailList', form);
  const initialValues = {};

  return (
    <div>
        <br/>
        <br/>
      <Row>
        <Col xs={24} sm={24} md={24} lg={{ span: 23 }} xl={{ span: 19, offset:2 }}>
          <Card
            style={{ height: 'auto'}}
            className="antCard card-shadow bankpaymentVoucher bankpayment-detail-card"
          >

            <Form.List name="purchaseOrderDetailList" initialValue={[initialValues]}>
              {(fields, { }) => (
                <>
                  {fields.map((field) => (
                    <div key={field.key} className="form-list-container">
                      <Col
                        xs={{ span: 16, offset: 2 }}
                        sm={{ span: 9, offset: 0 }}
                        md={{ span: 9, offset: 0 }}
                        lg={{ span: 8, offset: 1 }}
                        xl={{ span: 6, offset: 0 }}
                        className="formfield"
                      >
                        <AntSelectDynamic bordered={false} label="Tax Type" fieldValue="Id" fieldLabel="TaxName" name='TaxTypeId' 
                        query={useGetBankPaymentTax}
                        />
                      </Col>

                      <Col
                        xs={{ span: 5, offset: 0 }}
                        sm={{ span: 4, offset: 0 }}
                        md={{ span: 3, offset: 0 }}
                        lg={{ span: 3, offset: 0 }}
                        xl={{ span: 3, offset: 0 }}
                      >
                         <label>
                  <Checkbox
                    //   checked={isActive}
                    //   onChange={(e) => setIsActive(e.target.checked)}
                    //   name="IsActive"
                    style={{
                      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
                    }}
                    className="checkbox"
                  />
                  <span style={{ marginLeft: '5%' }}>WHT</span>
                </label>
                      </Col>

                      <Col
                        xs={{ span: 18, offset: 2 }}
                        sm={{ span: 9, offset: 0 }}
                        md={{ span: 9, offset: 1 }}
                        lg={{ span: 8, offset: 2 }}
                        xl={{ span: 6, offset: 0 }}
                        className="formfield"
                      >
                        <AntInputNumber bordered={false} label="Tax %" name={''} />
                      </Col>

                      <Col
                        xs={{ span: 18, offset: 2 }}
                        sm={{ span: 9, offset: 0 }}
                        md={{ span: 9, offset: 0 }}
                        lg={{ span: 8, offset: 1 }}
                        xl={{ span: 6, offset: 1 }}
                        className="formfield"
                      >
                        <AntSelectDynamic disabled bordered={false} fieldValue="" fieldLabel="" name={''} label="WHT Account" />
                      </Col>

                      <Col
                     xs={{ span: 18, offset: 2 }}
                      sm={{ span: 9, offset: 4 }}
                        md={{ span: 9, offset: 4 }}
                        lg={{ span: 8, offset: 5 }}
                        xl={{ span: 6, offset: 0 }}
                        className="formfield"
                      >
                        <AntInputNumber bordered={false} label="Amount"  />
                      </Col>

                      <Col
                        xs={{ span: 18, offset: 2 }}
                        sm={{ span: 9, offset: 0 }}
                        md={{ span: 9, offset: 0 }}
                        lg={{ span: 8, offset: 1 }}
                        xl={{ span: 6, offset: 3 }}
                        className="formfield"
                      >
                        <AntInputNumber bordered={false} label=" Tax Amount"  />
                      </Col>

                      <Col
                      xs={{ span: 18, offset: 2 }}
                      sm={{ span: 9, offset: 4 }}
                      md={{ span: 9, offset: 4 }}
                      lg={{ span: 8, offset: 5 }}
                      xl={{ span: 6, offset: 1 }}
                      className="formfield"
                      >
                        <AntInputNumber bordered={false} label="Total Amount"  />
                      </Col>
    
                    </div>
                  ))}
                </>
              )}
            </Form.List>
            <br/>
            <br/>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

type FormListt = { form: FormInstance };

export default FormListt;
