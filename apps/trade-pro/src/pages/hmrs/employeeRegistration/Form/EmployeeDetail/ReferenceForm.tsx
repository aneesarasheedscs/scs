import { Col, Form, FormInstance, Row } from 'antd';
import { AntButton, AntInput, AntSelectDynamic } from '@tradePro/components';
import { useTranslation } from 'react-i18next';
import ReferenceTable from './tables/ReferenceTable';

const { useWatch } = Form;

const ReferenceForm = ({ form }: TDynamicForm) => {
  const { t } = useTranslation();
  const { setFields, getFieldValue } = form;
  const formValues = useWatch<any[]>('purchaseOrderDetailList', form);
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <Form layout="inline" onFinish={onFinish}>
        <Row gutter={6} justify={'space-around'} style={{ marginTop: 15 }}>
          <Col xl={12} xs={24}>
            <Row gutter={[10, 10]} justify={'space-between'}>
              <Col xxl={12} xl={12} sm={12} md={12} xs={24} className="formfield">
                <AntInput bordered={false} label={t('reference_name')} name="addressDetail" />
              </Col>
              <Col xxl={11} xl={11} sm={11} md={11} xs={24} className="formfield">
                <AntInput bordered={false} label={t('organization_name')} name="addressDetail" />
              </Col>
              <Col xxl={12} xl={12} sm={12} xs={24} md={12} className="formfield">
                <AntSelectDynamic
                  required
                  bordered={false}
                  fieldValue="Id"
                  label={t('designation')}
                  name="SupplierCustomerId"
                  fieldLabel="CompanyName"
                  style={{ width: '105%' }}
                  // query={useGetSuppliersforGRN}
                />
              </Col>
              <Col xl={11} lg={11} md={11} sm={11} xs={24} className="formfield">
                <AntInput bordered={false} label={t('mobile')} name="addressDetail" />
              </Col>
            </Row>
          </Col>
          <Col xl={11} xs={24}>
            <Row gutter={[10, 10]} justify={'space-between'}>
              <Col xl={12} xxl={12} sm={12} md={12} xs={24} className="formfield">
                <AntInput bordered={false} label={t('description')} name="addressDetail" />
              </Col>
              <Col xxl={11} xl={11} sm={11} md={11} xs={24} className="formfield">
                <AntInput bordered={false} label={t('email')} name="addressDetail" />
              </Col>
              <Col xxl={4} xl={5} md={4} lg={4} sm={5} xs={5}>
                <AntButton label={t('add')} style={{ marginTop: 5 }} htmlType="submit" />
              </Col>
            </Row>
          </Col>

          <Row gutter={[10, 10]} style={{ marginTop: 10 }}>
            <Col xl={18}>
              <ReferenceTable />
            </Col>
          </Row>
        </Row>
      </Form>
    </>
  );
};

type TDynamicForm = { form: FormInstance };

export default ReferenceForm;
