import { isNumber } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { Checkbox, Col, Form, Row } from 'antd';
import { AntButton, AntInput } from '@tradePro/components';
import { useAddDiscountType, useGetDiscountTypeById, useUpdateDiscountType } from '../query';
import { TDiscountTypeData } from '../types';

const { useForm, useWatch } = Form;
interface TFormTypes {
  selectedRecordId?: number | null;
  setSelectedRecordId: (id: number | null) => void;
}
function DiscountTypeForm({ selectedRecordId, setSelectedRecordId }: TFormTypes) {
  const { t } = useTranslation();
  const [form] = useForm<TDiscountTypeData>();
  const formValues = useWatch<TDiscountTypeData>([], form);
  const { mutate: addDiscountType } = useAddDiscountType();
  const { mutate: updateDiscountType, isSuccess } = useUpdateDiscountType(selectedRecordId);
  const { data, refetch, isSuccess: isSuccessById } = useGetDiscountTypeById(selectedRecordId);

  const handleFinish = (values: TDiscountTypeData) => {
    console.log(values);
    if (isNumber(selectedRecordId)) {
      // form.resetFields();
      setSelectedRecordId(null);
      updateDiscountType(values);
    } else {
      addDiscountType(values);
    }
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
      <Row gutter={[10, 10]} style={{ marginBottom: 10, marginLeft: '0.5%' }}>
        <Col sm={24} md={24} lg={24} xl={20} xxl={18}>
          <Form form={form} layout="horizontal" onFinish={handleFinish} initialValues={{ remember: true }}>
            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xs={24} sm={12} md={10} lg={12} xl={7} xxl={8}>
                <p className="formfield2">
                  <AntInput name="DiscountTypeCode" required label={t('code')} bordered={false} />
                </p>
              </Col>
              <Col xs={24} sm={12} md={9} lg={8} xl={8} xxl={8}>
                <p className="formfield2">
                  <AntInput name="DiscountTypeDescription" required label={t('description')} bordered={false} />
                </p>
              </Col>
              <Col md={4} lg={4} xl={4} xxl={3}>
                <Row style={{ marginLeft: 10, marginTop: 10 }}>
                  <Form.Item name="IsActive" valuePropName="checked" initialValue={true}>
                    <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'IsActive')} checked={true}>
                      {t('is_active')}
                    </Checkbox>
                  </Form.Item>
                </Row>
              </Col>
              <Col xs={24} sm={10} md={24} lg={24} xl={5} xxl={4}>
                <Row gutter={[10, 10]} style={{ display: 'flex', justifyContent: 'end' }}>
                  <Col xs={12} sm={12} md={3} lg={3} xl={12} xxl={12}>
                    <AntButton
                      label={selectedRecordId ? t('update') : t('save')}
                      icon={<SaveOutlined />}
                      htmlType="submit"
                      className="fullWidth"
                      style={{ marginTop: 10 }}
                    />
                  </Col>
                  <Col xs={12} sm={12} md={3} lg={3} xl={12} xxl={12}>
                    <AntButton
                      danger
                      ghost
                      htmlType="reset"
                      label={t('reset')}
                      icon={<SyncOutlined />}
                      style={{ marginTop: 10 }}
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

export default DiscountTypeForm;
