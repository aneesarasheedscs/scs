import { Col, Form, FormInstance, Row } from 'antd';
import { AntButton, AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { useTranslation } from 'react-i18next';
import EmployeeCategory from '../lookUpForms/EmployeeCategory';
import EducationTable from './tables/EducationTable';

const { useWatch } = Form;

const EducationForm = ({ form }: TDynamicForm) => {
  const { t } = useTranslation();
  const { setFields, getFieldValue } = form;
  const formValues = useWatch<any[]>('purchaseOrderDetailList', form);
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <Form layout="inline" onFinish={onFinish}>
        <Row gutter={6} justify={'space-around'} style={{ marginTop: 10 }}>
          <Col xl={12} xs={24}>
            <Row gutter={[10, 10]} justify={'space-between'}>
              <Col xxl={12} xl={12} sm={12} md={12} xs={24} className="formfield">
                <Row gutter={10} justify={'space-between'}>
                  <Col xxl={22} xl={22} lg={22} sm={22} md={22} xs={22} className="formfield">
                    <AntSelectDynamic
                      required
                      bordered={false}
                      fieldValue="Id"
                      label={t('degree')}
                      name="SupplierCustomerId"
                      fieldLabel="CompanyName"
                      style={{ width: '100%' }}
                      // query={useGetSuppliersforGRN}
                    />
                  </Col>
                  <Col xxl={2} xl={2} lg={2} md={2} xs={2}>
                    <EmployeeCategory />
                  </Col>
                </Row>
              </Col>
              <Col xxl={11} xl={11} sm={11} xs={24} md={11} className="formfield">
                <AntInput bordered={false} label={t('degree_title')} name="addressDetail" />
              </Col>
              <Col xl={12} lg={12} md={12} sm={12} xs={24} className="formfield">
                <AntDatePicker label={t('start_year')} name="" bordered={false} />
              </Col>
              <Col xl={11} lg={11} md={11} sm={11} xs={24} className="formfield">
                <AntDatePicker label={t('passing_year')} name="" bordered={false} />
              </Col>
            </Row>
          </Col>
          <Col xl={11} xs={24}>
            <Row gutter={[10, 10]} justify={'space-between'}>
              <Col xl={12} xxl={12} sm={12} md={12} xs={24} className="formfield">
                <AntInput bordered={false} label={t('cgpa')} name="addressDetail" />
              </Col>

              <Col xxl={11} xl={11} sm={11} md={11} xs={24} className="formfield">
                <AntSelectDynamic
                  required
                  bordered={false}
                  fieldValue="Id"
                  label={t('city_name')}
                  name="SupplierCustomerId"
                  fieldLabel="CompanyName"
                  style={{ width: '105%' }}
                  // query={useGetSuppliersforGRN}
                />
              </Col>

              <Col xl={20} xxl={20} sm={20} md={20} xs={24} className="formfield">
                <AntInput bordered={false} label={t('institute')} name="addressDetail" />
              </Col>
              <Col xxl={4} xl={5} md={4} lg={4} sm={5} xs={5}>
                <AntButton label={t('add')} style={{ marginTop: 5 }} htmlType="submit" />
              </Col>
            </Row>
          </Col>

          <Row gutter={[10, 10]} style={{ marginTop: 10 }}>
            <Col xl={20}>
              <EducationTable />
            </Col>
          </Row>
        </Row>
      </Form>
    </>
  );
};

type TDynamicForm = { form: FormInstance };

export default EducationForm;
