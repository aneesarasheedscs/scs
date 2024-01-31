import {
  AntButton,
  AntDatePicker,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import { useState, useEffect } from 'react';
import { Col, Form, Row } from 'antd';
import { useGetAccountTypeId, useGetAccountTitle, PayableReportQueryHistory } from './queries';
import { PayablesSearchCriteria } from './type';
import { map } from 'lodash';
import dayjs from 'dayjs';
import '';

const { useForm, useWatch } = Form;

function SearchCriteria() {
  const [open, setOpen] = useState(false);
  const [AccountTypeId, setAccountTypeId] = useState(0);
  const [AccountData, setAccountData] = useState<any>([]);

  const handleAccountTypeChange = (value: number) => {
    setAccountTypeId(value);
  };

  const { data: AccountTypes } = useGetAccountTypeId();
  const { data: accountTitleData } = useGetAccountTitle(AccountTypeId);

  useEffect(() => {
    if (accountTitleData) {
      setAccountData(accountTitleData);
    }
  }, [accountTitleData]);

  const [form] = useForm<PayablesSearchCriteria>();
  const formValues = useWatch<PayablesSearchCriteria>([], form);

  const {
    refetch,
    isFetching,
    isError: isError,
    isLoading: isLoading,
  } = PayableReportQueryHistory(false, form.getFieldsValue());

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (Values: PayablesSearchCriteria) => {
    Values.Status = Array.isArray(Values.Status) ? Values.Status.join(', ') : Values.Status;
    refetch().then(() => handleClose());
  };

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={12}>
            <AntDatePicker name="FromDate" label="From Date" bordered={false} className="form_field" />
          </Col>

          <Col xs={24} sm={24} md={12}>
            <AntDatePicker name="ToDate" label="To Date" />
          </Col>

          <Col xs={24} sm={24} md={12}>
            <AntInputNumber name="BalanceFrom" label="Balance From" />
          </Col>

          <Col xs={24} sm={24} md={12}>
            <AntInputNumber name="BalanceTo" label="Balance To" />
          </Col>

          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              name="AccountId"
              label="Payable Account Type"
              fieldValue="Id"
              fieldLabel="AccountType"
              query={useGetAccountTitle}
              options={map(AccountTypes, (item: any) => ({
                value: item.Id,
                label: item.AccountType,
              }))}
              onChange={(value) => handleAccountTypeChange(value)}
            />
          </Col>

          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              mode="multiple"
              name="Status"
              label="Payable Account"
              fieldValue="AccountCode"
              fieldLabel="AccountTitle"
              options={map(AccountData, (Item: any) => ({
                value: Item?.AccountCode,
                label: Item?.AccountTitle,
              }))}
            />
          </Col>
        </Row>

        <Col xs={24} sm={24} md={8}>
          <AntButton
            label="Show"
            htmlType="submit"
            style={{ marginTop: 2 }}
            isError={isError}
            isLoading={isLoading || isFetching}
          />
        </Col>
      </Form>
    </SearchCriteriaWrapper>
  );
}

export default SearchCriteria;
