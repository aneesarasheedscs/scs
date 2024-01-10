import { Col, Form, FormInstance, Row } from 'antd';
import { AntButton, AntInput, AntSelectDynamic } from '@tradePro/components';
import { useTranslation } from 'react-i18next';
import FamilyTable from './tables/FamilyTable';

const { useWatch } = Form;

const FamilyForm = ({ form }: TDynamicForm) => {
  const { t } = useTranslation();
  const { setFields, getFieldValue } = form;
  const formValues = useWatch<any[]>('purchaseOrderDetailList', form);
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <Form layout="inline" onFinish={onFinish}>
        <Row gutter={[10, 10]} style={{ marginTop: 15 }}>
          <Col xl={14} xs={24}>
            <Row gutter={[10, 10]} justify={'space-between'} style={{ marginLeft: 15 }}>
              <Col xxl={12} xl={12} sm={12} md={12} xs={24} className="formfield">
                <AntSelectDynamic
                  required
                  bordered={false}
                  fieldValue="Id"
                  label={t('relationship')}
                  name="SupplierCustomerId"
                  fieldLabel="CompanyName"
                  style={{ width: '100%' }}
                  // query={useGetSuppliersforGRN}
                />
              </Col>
              <Col xxl={11} xl={11} sm={11} xs={24} md={11} className="formfield">
                <AntInput bordered={false} label={t('relation_name')} name="addressDetail" />
              </Col>
            </Row>
          </Col>
          <Col xl={10} xs={24}>
            <Row gutter={[10, 10]} justify={'space-evenly'}>
              <Col xl={12} xxl={12} sm={12} md={12} xs={24} className="formfield">
                <AntInput bordered={false} label={t('description')} name="addressDetail" />
              </Col>

              <Col xxl={4} xl={5} md={4} lg={4} sm={5} xs={5}>
                <AntButton label={t('add')} style={{ marginTop: 5 }} htmlType="submit" />
              </Col>
            </Row>
          </Col>

          <Row gutter={[10, 10]} style={{ marginTop: 10 }}>
            <Col xl={16}>
              <FamilyTable />
            </Col>
          </Row>
        </Row>
      </Form>
    </>
  );
};

type TDynamicForm = { form: FormInstance };

export default FamilyForm;
