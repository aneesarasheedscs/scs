import {
  AntButton,
  AntDatePicker,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Col, Form, Radio, RadioChangeEvent, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { TSearchCriteria } from './types';
import { useGetAccountTitle, useGetCashPaymentVoucherTable } from '../queries/queries';
import { CriteriaRowGutter } from '@tradePro/globalAtoms';
import { map } from 'lodash';

const { useForm, useWatch } = Form;
interface TApprovedStatus {
  Id: number;
  Status: string;
}
function SearchCriteria() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const financialYear = storedFinancialYear();
  const [form] = useForm<TSearchCriteria>();
  const formValues = useWatch<TSearchCriteria>([], form);
  const { data, isError, isLoading, refetch: refetchCPV, isFetching } = useGetCashPaymentVoucherTable(true, formValues);
  const [value, setValue] = useState(1);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (_: TSearchCriteria) => {
    refetchCPV().then(() => handleClose());
  };
  const { data: accountTitle } = useGetAccountTitle();
  const accounTitleData = accountTitle?.data?.Data?.Result?.filter(
    (item: any) => item.ActivityType === 'Account Header'
  );

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  useEffect(() => {
    const januaryFirst = dayjs().startOf('year').set('month', 0).set('date', 1);
    form.setFields([{ name: 'FromDate', value: dayjs(financialYear?.Start_Period) }]);
    form.setFields([{ name: 'ToDate', value: dayjs(new Date()) }]);
    form.setFields([{ name: 'DateType', value: 1 }]);
    form.setFields([{ name: 'ApprovedStatus', value: 'Not Approved' }]);
  }, []);

  const Status: TApprovedStatus[] = [
    {
      Id: 1,
      Status: 'Not Approved',
    },
    {
      Id: 2,
      Status: 'Approved',
    },
    {
      Id: 3,
      Status: 'All',
    },
  ];
  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="horizontal" initialValues={formValues}>
        <Row gutter={CriteriaRowGutter} justify={'space-between'}>
          <Col xs={24} sm={24} md={12} className="formfield">
            <AntDatePicker name="FromDate" label={t('from_date')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11} className="formfield">
            <AntDatePicker name="ToDate" label={t('to_date')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={12} className="formfield">
            <AntInputNumber name="FromDocNo" label={t('from_doc_no')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11} className="formfield">
            <AntInputNumber name="ToDocNo" label={t('to_doc_no')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={12} className="formfield">
            <AntSelectDynamic
              name="AccountId"
              label={t('account_title')}
              fieldValue="Id"
              fieldLabel="name"
              options={map(accounTitleData, (item) => ({
                value: item.Id,
                label: item.name,
              }))}
              bordered={false}
            />
          </Col>

          <Col xs={24} sm={24} md={11} className="formfield">
            <AntSelectDynamic
              name="ApprovedStatus"
              fieldValue="Id"
              label={t('approved_status')}
              fieldLabel="Status"
              options={map(Status, (item) => ({
                value: item.Status,
                label: item.Status,
              }))}
              bordered={false}
            />
          </Col>
          <Col xs={24} sm={24} md={16} style={{ marginTop: 5 }}>
            <Form.Item name="DateType">
              <Radio.Group value={value} onChange={onChange}>
                <Radio value={1}>Doc Date</Radio>
                <Radio value={2}>Entry Date</Radio>
                <Radio value={3}>Modify Date</Radio>
                <Radio value={4}>Approved Date</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24}>
            <Row align="middle" gutter={[10, 10]} justify={'end'}>
              <Col xs={24} sm={24} md={3}>
                <AntButton
                  label={t('show')}
                  htmlType="submit"
                  style={{ marginTop: 2 }}
                  isError={isError}
                  isLoading={isLoading || isFetching}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </SearchCriteriaWrapper>
  );
}

export default SearchCriteria;
