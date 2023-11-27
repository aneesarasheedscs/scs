import { AntButton } from '@tradePro/components';
import { Card, Col, Form, Row } from 'antd';
import '../style.scss';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import CustomerDiscountPolicy from './CustomerDiscountPolicy';
import {
  useAddCustomerDiscountPolicy,
  useGetCustomerDetailPolicyById,
  useGetCustomerDetailPolicyCustomerSelect,
  useGetCustomerDetailPolicyDiscountTypeSelect,
  useUpdateCustomerDiscountPolicy,
} from '../queries';
import { useEffect, useState } from 'react';
import { isNumber } from 'lodash';
import dayjs from 'dayjs';
import { CustomerDiscountPolicieslist } from '../types';
import { storedUserDetail } from '@tradePro/utils/storageService';
import AllocateDiscountItemForm from './AllocateDiscountItemToDiscountType';

const { useForm } = Form;

function MainForm({ selectedRecordId }: TAddUpdateRecord) {
  const [form] = useForm<CustomerDiscountPolicieslist[]>();
  const { t } = useTranslation();
  const { data: customer, isSuccess } = useGetCustomerDetailPolicyCustomerSelect();
  const { data: discountType } = useGetCustomerDetailPolicyDiscountTypeSelect();
  const [discountChange, setDiscountChange] = useState();
  const {
    data: addCustomerDetailPolicy,
    refetch: refetchCustomerDetailPolicy,
    isSuccess: isDataSuccess,
  } = useGetCustomerDetailPolicyById(selectedRecordId);

  const { mutate: addCustomerDetail } = useAddCustomerDiscountPolicy();
  const { mutate: updateCustomerDetail } = useUpdateCustomerDiscountPolicy(selectedRecordId);

  useEffect(() => {
    if (isSuccess) form.setFields([{ name: 'EffectiveDate', value: dayjs(new Date()) }]);
    form.setFieldValue('CustomerId', customer?.data?.Data?.Result?.[0]?.CompanyName);
    form.setFieldValue('DiscountTypeId', discountType?.data?.Data?.Result?.[0]?.DiscountTypeDescription);
  }, [isSuccess]);
  const onFinish = (values: any) => {
    const userDetail = storedUserDetail();

    let data: any = [];
    data.CustomerDiscountPolicieslist = [];
    data?.CustomerDiscountPolicieslist.push({
      Id: selectedRecordId ? selectedRecordId : 0,
      OrganizationId: userDetail?.OrganizationId,
      CompanyId: userDetail?.CompanyId,
      BranchesId: 2,
      CustomerId: values.CustomerId,
      EffectiveDate: values.EffectiveDate,
      DiscountType: 'Percent',
      DiscountTypeId: values.DiscountTypeId,
      DiscountItemId: values.DiscountItemId,
      DiscountRate: values.DiscountRate,
      IsActive: values.IsActive,
    });

    if (isNumber(selectedRecordId)) {
      updateCustomerDetail(data);
      console.log(data);
    } else {
      addCustomerDetail(data);
      console.log(data);
    }
  };

  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetchCustomerDetailPolicy();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess) {
      setDiscountChange(addCustomerDetailPolicy?.data?.Data?.Result?.DiscountTypeId);
      form.setFieldsValue(addCustomerDetailPolicy?.data?.Data?.Result);
      form.setFieldValue('EffectiveDate', dayjs(addCustomerDetailPolicy?.data?.Data?.Result?.EffectiveDate));
    }
  }, [isDataSuccess]);

  return (
    <Card>
      <Form initialValues={{ remember: true }} form={form} layout="horizontal" onFinish={onFinish}>
        <div>
          <Row align="middle" justify="space-between">
            <Col style={{ display: 'flex', justifyContent: 'end' }} span={24}>
              <Form.Item>
                <Row align="middle" style={{ marginLeft: '-2.5%', marginTop: '-5%' }} gutter={10}>
                  <Col className="file">
                    <AllocateDiscountItemForm />
                  </Col>
                  <Col>
                    <AntButton danger ghost htmlType="reset" label={t('reset')} icon={<SyncOutlined />} />
                  </Col>
                  <Col>
                    <AntButton
                      label={selectedRecordId ? t('update') : t('save')}
                      icon={<SaveOutlined />}
                      htmlType="submit"
                    />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <br />
        <CustomerDiscountPolicy
          form={form}
          isDataSuccess={isDataSuccess}
          setDiscountChange={setDiscountChange}
          discountChange={discountChange}
        />
      </Form>
    </Card>
  );
}

type TAddUpdateRecord = {
  selectedRecordId?: number | null;
  DiscountTypeId?: number | any;
};

export default MainForm;
