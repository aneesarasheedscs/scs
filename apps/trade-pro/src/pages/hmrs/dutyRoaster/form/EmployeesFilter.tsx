import { AntButton, AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Checkbox, Col, Row, Form, FormInstance } from 'antd';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';
import Department from './departmentLookUpForm';

import Location from './locationLookUpForm';
import Category from './categoryLookUpForm';
import Section from './sectionLookUpForm';

function EmployeesFilter() {
  // { form }: TDynamicForm
  const { t } = useTranslation();

  // const { data: filter } = useGetContraCreditAccountSelect();

  return (
    <>
      {/* <h2 style={{ boxShadow: '2px 2px 12px 1px #5a54f9' }} className="form-heading">
        {t('duty_roaster')}
      </h2> */}

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card style={{ marginTop: '5%', boxShadow: '2px 4px 12px 1px lightgray' }}>
            <h3>{t('employees_filters_for_duty_roaster')} </h3>
            <br />

            <div className="form-list-container">
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 23, offset: 0 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 10, offset: 0 }}
                className="formfield"
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('category')}
                  fieldValue="Id"
                  fieldLabel="CheqNo"
                  name="Id"
                />
              </Col>
              <Form.Item style={{ marginTop: 30, marginLeft: -10 }}>
                <Category />
              </Form.Item>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 23, offset: 0 }}
                md={{ span: 11, offset: 1 }}
                lg={{ span: 11, offset: 1 }}
                xl={{ span: 10, offset: 0 }}
                className="formfield"
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('department')}
                  fieldValue="Id"
                  fieldLabel="CheqNo"
                  name="Id"
                />
              </Col>

              <Form.Item style={{ marginTop: 30, marginLeft: -10 }}>
                <Department />
              </Form.Item>

              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 23, offset: 0 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 10, offset: 0 }}
                className="formfield"
              >
                <AntSelectDynamic bordered={false} label={t('section')} fieldValue="Id" fieldLabel="CheqNo" name="Id" />
              </Col>

              <Form.Item style={{ marginTop: 30, marginLeft: -10 }}>
                <Section />
              </Form.Item>

              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 23, offset: 0 }}
                md={{ span: 11, offset: 1 }}
                lg={{ span: 11, offset: 1 }}
                xl={{ span: 10, offset: 0 }}
                className="formfield"
                // style={{ marginTop: '1.2%' }}
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('location')}
                  fieldValue="Id"
                  fieldLabel="CheqNo"
                  name="Id"
                />
              </Col>

              <Form.Item style={{ marginTop: 30, marginLeft: -10 }}>
                <Location />
              </Form.Item>

              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 23, offset: 0 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 10, offset: 0 }}
                className="formfield"
                // style={{ marginTop: '0.2rem', borderBottom: '1px solid gray', height: '60px' }}
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('employee Name')}
                  fieldValue="Id"
                  fieldLabel="AccountTitle"
                  name="AccountTypeId"
                />
              </Col>

              <Form.Item style={{ marginTop: 30, marginLeft: -10 }}>{/* <Department /> */}</Form.Item>

              <Col span={4} offset={1}>
                <AntButton label={t('load')} />
              </Col>
            </div>
          </Card>
        </Col>
      </Row>
      <br />
    </>
  );
}

type TDynamicForm = { form: FormInstance };

export default EmployeesFilter;
