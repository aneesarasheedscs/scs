import { isNumber } from 'lodash';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { Checkbox, Col, Form, Row } from 'antd';
import { AntButton, AntSelectDynamic } from '@tradePro/components';
import { TSaveCustomerAllocateDiscountPolicy } from '../../../types';
import {
  useAddAllocateDiscount,
  useGetCustomerDetailPolicyDiscountById,
  useGetCustomerDetailPolicyDiscountItemModalSelect,
  useGetCustomerDetailPolicyDiscountTypeModalSelect,
  useUpdateAllocateDiscount,
} from '../../../queries';

const { useForm } = Form;

function AllocateDiscountItem({ selectedRecordId2, setSelectedRecordId2 }: TAddUpdateRecord) {
  const { t } = useTranslation();
  const [form] = useForm<TSaveCustomerAllocateDiscountPolicy>();
  const { mutate: addAllocateDiscount } = useAddAllocateDiscount();
  const { mutate: updateAllocateDiscount } = useUpdateAllocateDiscount(selectedRecordId2);
  const {
    data,
    refetch,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetCustomerDetailPolicyDiscountById(selectedRecordId2);
  const handleCheckboxChange = (isChecked: boolean, fieldName: string) => {
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };
  console.log(data);
  const handleFinish = (values: TSaveCustomerAllocateDiscountPolicy) => {
    console.log(values);
    if (isNumber(selectedRecordId2)) {
      setSelectedRecordId2(null);
      updateAllocateDiscount(values);
    } else {
      addAllocateDiscount(values);
    }
  };
  useEffect(() => {
    if (isNumber(selectedRecordId2)) {
      refetch();
    }
  }, [selectedRecordId2]);

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldsValue(data?.data?.Data?.Result);
    }
  }, [isDataSuccess]);
  console.log(selectedRecordId2);
  const handleResetForm = () => {
    setSelectedRecordId2(null);
  };
  return (
    <>
      <Form form={form} layout="horizontal" onFinish={handleFinish} initialValues={{ remember: true }}>
        <Row gutter={[10, 10]} style={{ marginLeft: '1%' }} justify={'space-between'}>
          <Col xs={24} sm={24} md={8} xxl={6} className="formfield">
            <AntSelectDynamic
              required
              bordered={false}
              label={t('discount_item_name')}
              fieldValue="Id"
              fieldLabel="DiscountItemName"
              name="DiscountItemId"
              query={useGetCustomerDetailPolicyDiscountItemModalSelect}
            />
          </Col>

          <Col xs={24} sm={24} md={8} xxl={8} className="formfield">
            <AntSelectDynamic
              required
              bordered={false}
              label={t('discount_type_name')}
              fieldValue="Id"
              fieldLabel="DiscountTypeDescription"
              name="DiscountTypeId"
              query={useGetCustomerDetailPolicyDiscountTypeModalSelect}
            />
          </Col>
          <Col xxl={3}>
            <label>
              <Form.Item name="IsActive" valuePropName="checked" initialValue={true}>
                <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'IsActive')}>
                  {t('is_active')}
                </Checkbox>
              </Form.Item>
            </label>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xxl={4} style={{ display: 'flex', flexDirection: 'row' }}>
            <Form.Item>
              <Row align="middle" gutter={10} style={{ marginTop: '0%' }}>
                <Col span={12}>
                  <AntButton
                    danger
                    ghost
                    htmlType="reset"
                    onClick={handleResetForm}
                    label={t('reset')}
                    icon={<SyncOutlined />}
                  />
                </Col>

                <Col span={12}>
                  <AntButton
                    ghost
                    label={isNumber(selectedRecordId2) ? t('update') : t('save')}
                    htmlType="submit"
                    icon={<SaveOutlined />}
                  />
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

interface TAddUpdateRecord {
  selectedRecordId2?: number | null;
  setSelectedRecordId2: (Id: number | null) => void;
}

export default AllocateDiscountItem;
