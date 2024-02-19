import { AntButton, AntDatePicker, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';
import React, { useEffect, useState } from 'react';
import { Checkbox, Col, Form, Radio, Row, Space } from 'antd';
import { TFilterForms } from '../type';
import { useGetAccountTitle } from '../queryOptions';
import dayjs from 'dayjs';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { t } from 'i18next';
import { map } from 'lodash';
const { useForm, useWatch } = Form;

interface Criteria {
  FromDateProp?: Date;
  ToDateProp?: Date;
  AccountIdProp?: number;
  CompanyId?: number;
}

const FinancialYear = storedFinancialYear();
const userDetail = storedUserDetail();

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
  const { setFieldValue } = form;

  // const { data } = useGetAccountTitle(
  //   CriteriaObject?.CompanyId !== undefined ? CriteriaObject?.CompanyId : userDetail?.CompanyId
  // );
  // const AccountTitleData = data?.data?.Data?.Result;

  useEffect(() => {
    if (
      CriteriaObject?.AccountIdProp !== undefined &&
      CriteriaObject?.FromDateProp !== undefined &&
      CriteriaObject?.ToDateProp !== undefined
    ) {
      form.setFieldValue('FromDate', dayjs(CriteriaObject?.FromDateProp));
      form.setFieldValue('ToDate', dayjs(CriteriaObject?.ToDateProp));
      form.setFieldValue('AccountId', CriteriaObject?.AccountIdProp);
      handleAccountTitleChange(CriteriaObject?.AccountIdProp);
    } else {
      setFieldValue('FromDate', FromDate);
      setFieldValue('ToDate', ToDate);
    }
  }, []);

  const [formState, setformState] = useState<TFilterForms>({
    AccountId: CriteriaObject?.AccountIdProp,
    FromDate: CriteriaObject?.FromDateProp,
    ToDate: CriteriaObject?.ToDateProp,
    PostUnpost: true,
    ReportType: 1,
  });

  useEffect(() => {
    handleFormStateChange(formState);
  }, [formState]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (_: TFilterForms) => {
    setformState(form.getFieldsValue());
    handleClose();
  };

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form style={style} form={form} onFinish={onFinish} layout="horizontal">
        <Row gutter={[12, 12]} align="middle" justify="space-between">
          <Col span={6} className="formfield">
            <AntDatePicker bordered={false} name="FromDate" label={t('from_date')} placeholder="" />
          </Col>

          <Col span={6} className="formfield">
            <AntDatePicker bordered={false} name="ToDate" label={t('to_date')} placeholder="" />
          </Col>

          <Col span={11} className="formfield">
            <AntSelectDynamic
              required
              bordered={false}
              label={t('account_title')}
              name="AccountId"
              fieldValue="Id"
              fieldLabel="AccountTitle"
              onChange={(value) => handleAccountTitleChange(value)}
              query={() =>
                useGetAccountTitle(
                  CriteriaObject?.CompanyId !== undefined ? CriteriaObject?.CompanyId : userDetail?.CompanyId
                )
              }
            />
          </Col>

          <Col span={12}>
            <Form.Item name="ReportType" label={t('report_type')}>
              <Radio.Group defaultValue={'1'}>
                <Space direction="horizontal">
                  <Radio value="1">{t('detail')}</Radio>
                  <Radio value="2">{t('summary_I')}</Radio>
                  <Radio value="3">{t('summary_II')}</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item name="PostUnpost" valuePropName="checked" initialValue={true}>
              <Checkbox>{t('include_unposted_vouchers')}</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row align="middle" justify="end" gutter={[10, 10]}>
          <Col xs={5} sm={5} md={5} xxl={3}>
            <AntButton label={t('show')} htmlType="submit" style={{ marginTop: 15 }} />
          </Col>
        </Row>
      </Form>
      <br />
    </SearchCriteriaWrapper>
  );
};

export default AccountsDetailSearchCriteriaForm;
