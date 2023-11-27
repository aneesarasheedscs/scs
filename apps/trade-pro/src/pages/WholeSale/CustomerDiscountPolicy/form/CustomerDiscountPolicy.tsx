import { AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Checkbox, Col, Row, Form, FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  useGetCustomerDetailPolicyCustomerSelect,
  useGetCustomerDetailPolicyDiscountTypeSelect,
  useGetDiscountTypeChange,
} from '../queries';
import { useEffect, useState } from 'react';
function CustomerDiscountPolicyForm({ form, isDataSuccess, discountChange, setDiscountChange }: TDynamicForm) {
  const { t } = useTranslation();
  const [discountPercentage, setDiscountPercentage] = useState<number | string>('');
  const { data: discountTypeChangeData } = useGetDiscountTypeChange(discountChange);
  const handleCheckboxChange = (isChecked: boolean, fieldName: string) => {
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };

  const handleDiscountTypeChange = (value: any) => {
    setDiscountChange(value);
  };

  const discountItem =
    discountTypeChangeData?.data?.Data?.Result?.map((discount: any) => ({
      label: discount.DiscountItemName,
      value: discount.DiscountItemId,
    })) || [];

  useEffect(() => {
    if (isDataSuccess && discountTypeChangeData?.data?.Data?.Result?.[0]?.DiscPerncentage) {
      setDiscountPercentage(discountTypeChangeData?.data?.Data?.Result?.[0]?.DiscPerncentage);
      form.setFieldsValue({ DiscountRate: discountTypeChangeData?.data?.Data?.Result?.[0]?.DiscPerncentage });
    } else {
      setDiscountPercentage('');
    }
  }, [isDataSuccess, discountTypeChangeData, form]);

  useEffect(() => {
    if (discountTypeChangeData?.data?.Data?.Result?.[0]?.DiscPerncentage) {
      setDiscountPercentage(discountTypeChangeData?.data?.Data?.Result?.[0]?.DiscPerncentage);
      form.setFieldsValue({ DiscountRate: discountTypeChangeData?.data?.Data?.Result?.[0]?.DiscPerncentage });
    } else {
      setDiscountPercentage('');
    }
  }, [discountChange, discountTypeChangeData, form]);

  console.log(discountItem);

  return (
    <>
      <Row gutter={[10, 10]} style={{ marginTop: '-2%' }}>
        <Col span={24}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray' }}>
            <div className="form-list-container">
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 21, offset: 1 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 7, offset: 0 }}
                style={{ marginBottom: '1%' }}
                className="formfield"
              >
                <AntDatePicker bordered={false} name="EffectiveDate" label={t('effected_date')} />
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 21, offset: 1 }}
                md={{ span: 11, offset: 1 }}
                lg={{ span: 11, offset: 1 }}
                xl={{ span: 7, offset: 1 }}
                style={{ marginBottom: '1%' }}
                className="formfield balance"
              >
                <AntSelectDynamic
                  required
                  bordered={false}
                  label={t('customer_name')}
                  fieldValue="Id"
                  fieldLabel="CompanyName"
                  name="CustomerId"
                  query={useGetCustomerDetailPolicyCustomerSelect}
                />
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 21, offset: 1 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 7, offset: 1 }}
                style={{ marginBottom: '1%' }}
                className="formfield"
              >
                <AntSelectDynamic
                  required
                  bordered={false}
                  label={t('discount_type')}
                  fieldValue="Id"
                  fieldLabel="DiscountTypeDescription"
                  name="DiscountTypeId"
                  query={useGetCustomerDetailPolicyDiscountTypeSelect}
                  onChange={(value) => {
                    handleDiscountTypeChange(value);
                  }}
                />
              </Col>

              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 21, offset: 1 }}
                md={{ span: 11, offset: 1 }}
                lg={{ span: 11, offset: 1 }}
                xl={{ span: 7, offset: 0 }}
                className="formfield status"
              >
                <AntSelectDynamic
                  required
                  bordered={false}
                  label={t('discount_category')}
                  fieldValue="DiscountItemId"
                  fieldLabel="DiscountItemName"
                  name="DiscountItemId"
                  options={discountItem}
                />
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 16, offset: 1 }}
                md={{ span: 13, offset: 0 }}
                lg={{ span: 14, offset: 0 }}
                xl={{ span: 7, offset: 1 }}
                className="formfield"
              >
                <AntInput
                  disabled
                  bordered={false}
                  name="DiscountRate"
                  label={t('discount_percentage')}
                  value={discountPercentage}
                />
              </Col>

              <Col
                xs={{ span: 18, offset: 0 }}
                sm={{ span: 5, offset: 1 }}
                md={{ span: 5, offset: 1 }}
                lg={{ span: 5, offset: 1 }}
                xl={{ span: 5, offset: 1 }}
                style={{ marginTop: '1%', marginBottom: '-2%' }}
                className="checkbox"
              >
                <label>
                  <Form.Item name="IsActive" valuePropName="checked" initialValue={true}>
                    <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'IsActive')}>
                      {t('is_active')}
                    </Checkbox>
                  </Form.Item>
                </label>
              </Col>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}

type TDynamicForm = { form: FormInstance; setDiscountChange: any; isDataSuccess: any; discountChange: any };

export default CustomerDiscountPolicyForm;
