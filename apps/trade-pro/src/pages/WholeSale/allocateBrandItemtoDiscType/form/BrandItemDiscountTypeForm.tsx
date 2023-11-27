import { isNumber } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { Checkbox, Col, Form, Row } from 'antd';
import { AntButton, AntSelectDynamic } from '@tradePro/components';
import {
  useAddAllocateBrandItemToDiscountType,
  useGetAllocateBrandItemToDiscountTypeById,
  useGetDiscountTypeCombo,
  useGetItemCombo,
  useUpdateAllocateBrandItemToDiscountType,
} from '../query';
import { TAllocateBrandItemToDiscTypeData } from '../types';

const { useForm, useWatch } = Form;

function BrandItemDiscountTypeForm({ selectedRecordId, setSelectedRecordId }: TFormTypes) {
  const { t } = useTranslation();
  const [form] = useForm<TAllocateBrandItemToDiscTypeData>();
  const { mutate: addAllocateBrandItemToDiscountType } = useAddAllocateBrandItemToDiscountType();
  const { mutate: updateAllocateBrandItemToDiscountType, isSuccess } =
    useUpdateAllocateBrandItemToDiscountType(selectedRecordId);
  const { data, refetch, isSuccess: isSuccessById } = useGetAllocateBrandItemToDiscountTypeById(selectedRecordId);

  const handleFinish = (values: TAllocateBrandItemToDiscTypeData) => {
    console.log(values);
    if (isNumber(selectedRecordId)) {
      updateAllocateBrandItemToDiscountType(values);
      form.resetFields();
      setSelectedRecordId(null);
    } else {
      addAllocateBrandItemToDiscountType(values);
    }

    console.log(selectedRecordId);
  };

  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetch();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isSuccessById) {
      form.setFieldsValue(data?.data?.Data?.Result);
    }
  }, [isSuccessById]);
  const handleCheckboxChange = (isChecked: boolean, fieldName: string) => {
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };
  return (
    <>
      <Row gutter={[10, 10]} style={{ marginBottom: 10, marginLeft: '1%' }}>
        <Col sm={24} md={24} lg={24} xl={20} xxl={18}>
          <Form form={form} layout="horizontal" onFinish={handleFinish} initialValues={{ remember: true }}>
            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xs={24} sm={13} md={11} lg={12} xl={9} xxl={9}>
                <p className="formfield2">
                  <AntSelectDynamic
                    bordered={false}
                    required
                    label={t('brand_item_name')}
                    fieldValue="Id"
                    fieldLabel="ItemName"
                    name="BrandItemId"
                    query={useGetItemCombo}
                    className="select"
                  />
                </p>
              </Col>
              <Col xs={24} sm={11} md={9} lg={8} xl={7} xxl={8}>
                <p className="formfield2">
                  <AntSelectDynamic
                    bordered={false}
                    className="select"
                    required
                    label={t('discount_type')}
                    fieldValue="Id"
                    fieldLabel="DiscountTypeDescription"
                    name="DiscountTypeId"
                    query={useGetDiscountTypeCombo}
                  />
                </p>
              </Col>
              <Col md={4} lg={4} xl={3} xxl={3}>
                <Row style={{ marginLeft: 10, marginTop: 10 }}>
                  <Form.Item name="IsActive" valuePropName="checked" initialValue={true}>
                    <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'IsActive')} checked={true}>
                      {t('is_active')}
                    </Checkbox>
                  </Form.Item>
                </Row>
              </Col>
              <Col xs={24} sm={7} md={24} lg={24} xl={5} xxl={4}>
                <Row gutter={[10, 10]} style={{ display: 'flex', justifyContent: 'end' }}>
                  <Col xs={12} sm={12} md={3} lg={3} xl={12} xxl={12}>
                    <AntButton
                      label={selectedRecordId ? t('update') : t('save')}
                      icon={<SaveOutlined />}
                      htmlType="submit"
                      className="fullWidth"
                      style={{ marginTop: 5 }}
                    />
                  </Col>
                  <Col xs={12} sm={12} md={3} lg={3} xl={12} xxl={12}>
                    <AntButton
                      danger
                      ghost
                      htmlType="reset"
                      label={t('reset')}
                      icon={<SyncOutlined />}
                      style={{ marginTop: 5 }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
}
interface TFormTypes {
  selectedRecordId?: number | null;
  setSelectedRecordId: (id: number | null) => void;
}
export default BrandItemDiscountTypeForm;
