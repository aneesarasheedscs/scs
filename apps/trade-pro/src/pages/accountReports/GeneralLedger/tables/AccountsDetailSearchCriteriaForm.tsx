import { AntButton, AntDatePicker, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';
import React, { useEffect, useState } from 'react';
import { Checkbox, Col, Form, Radio, Row, Space } from 'antd';
import { TFilterForms } from '../type';
import { useGetAccountTitle } from '../queryOptions';
import dayjs from 'dayjs';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { t } from 'i18next';
const { useForm, useWatch } = Form;

interface Criteria {
  FromDateProp?: Date;
  ToDateProp?: Date;
  AccountIdProp?: number;
}

const FinancialYear = storedFinancialYear();
const FromDate = dayjs(FinancialYear?.Start_Period);
const ToDate = dayjs(FinancialYear?.End_Period);
const style: React.CSSProperties = { marginTop: '20px' };
const AccountsDetailSearchCriteriaForm: React.FC<{
  CriteriaObject?: Criteria;
  handleAccountTitleChange: any;
  handleFormStateChange: any;
}> = (props) => {
  const { CriteriaObject, handleAccountTitleChange, handleFormStateChange } = props;
  const [open, setOpen] = useState(false);
  const [form] = useForm<TFilterForms>();
  const formValues = useWatch<TFilterForms>([], form);
  const { setFieldValue, getFieldValue } = form;

  useEffect(() => {
    if (
      CriteriaObject?.AccountIdProp !== undefined &&
      CriteriaObject?.FromDateProp !== undefined &&
      CriteriaObject !== undefined
    ) {
      form.setFieldValue('AccountId', CriteriaObject?.AccountIdProp);
      form.setFieldValue('FromDate', dayjs(CriteriaObject?.FromDateProp));
      form.setFieldValue('ToDate', dayjs(CriteriaObject?.ToDateProp));
    } else {
      setFieldValue('FromDate', FromDate);
      setFieldValue('ToDate', ToDate);
    }
  }, []);

  const [formState, setformState] = useState<TFilterForms>({
    AccountId: CriteriaObject?.AccountIdProp,
    FromDate: CriteriaObject?.FromDateProp,
    ToDate: CriteriaObject?.ToDateProp,
    PostUnpost: false,
    ReportType: 1,
  });

  useEffect(() => {
    handleFormStateChange(formState);
  }, [formState]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (_: TFilterForms) => {
    setformState(form.getFieldsValue());
  };

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form style={style} form={form} onFinish={onFinish} layout="horizontal">
        <Row gutter={[12, 12]} align="middle" justify="space-between">
          <Col span={6} className="formfield">
            <AntDatePicker bordered={false} name="FromDate" label="From Date" />
          </Col>

          <Col span={6} className="formfield">
            <AntDatePicker bordered={false} name="ToDate" label="To Date" />
          </Col>

          <Col span={8} className="formfield">
            <AntSelectDynamic
              required
              bordered={false}
              name="AccountId"
              fieldValue="Id"
              label="Account Title"
              query={useGetAccountTitle}
              fieldLabel="AccountTitle"
              onChange={(value) => handleAccountTitleChange(value)}
            />
          </Col>

          <Col span={6}>
            <Form.Item name="ReportType" label="Report Type">
              <Radio.Group defaultValue={'1'}>
                <Space direction="horizontal">
                  <Radio value="1">Detail</Radio>
                  <Radio value="2">SummaryI</Radio>
                  <Radio value="3">SummaryII</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item name="PostUnpost" valuePropName="checked" initialValue={false}>
              <Checkbox>{t('include_unposted_vouchers')}</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row align="middle" justify="end" gutter={[10, 10]}>
          <Col xs={5} sm={5} md={5}>
            <AntButton label="Show" htmlType="submit" style={{ marginTop: 15 }} />
          </Col>
        </Row>
      </Form>
      <br />
    </SearchCriteriaWrapper>
  );
};

export default AccountsDetailSearchCriteriaForm;
