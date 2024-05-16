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
import { CriteriaRowGutter } from '@tradePro/globalAtoms';
import { useGetBankReceiptVoucherTable } from '../queries/queries';
const { useForm, useWatch } = Form;

function SearchCriteria() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const financialYear = storedFinancialYear();
  const [form] = useForm<TSearchCriteria>();
  const formValues = useWatch<TSearchCriteria>([], form);
  const [value, setValue] = useState(1);
  const { data, isError, isLoading: isLoadingBRV, refetch: refetchBRV, isFetching } = useGetBankReceiptVoucherTable();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (_: TSearchCriteria) => {
    refetchBRV().then(() => handleClose());
  };
  useEffect(() => {
    const januaryFirst = dayjs().startOf('year').set('month', 0).set('date', 1);
    form.setFields([{ name: 'FromDate', value: dayjs(financialYear?.Start_Period) }]);
    form.setFields([{ name: 'ToDate', value: dayjs(new Date()) }]);
  }, []);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
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
            <AntInputNumber name="FromVoucherNo" label={t('from_doc_no')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11} className="formfield">
            <AntInputNumber name="ToVoucherNo" label={t('to_doc_no')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={12} className="formfield">
            <AntSelectDynamic
              fieldValue="Id"
              label={t('account_title')}
              // query={useGetSuppliers}
              fieldLabel="CompanyName"
              name="SupplierCustomerId"
              bordered={false}
            />
          </Col>

          <Col xs={24} sm={24} md={11} className="formfield">
            <AntSelectDynamic
              name="ItemId"
              fieldValue="Id"
              label={t('approved_status')}
              // query={useGetItems}
              fieldLabel="ItemName"
              bordered={false}
            />
          </Col>
          <Col xs={24} sm={24} md={16} style={{ marginTop: 5 }}>
            <Radio.Group value={value} onChange={onChange}>
              <Radio value={1}>Doc Date</Radio>
              <Radio value={2}>Entry Date</Radio>
              <Radio value={3}>Modify Date</Radio>
              <Radio value={4}>Approved Date</Radio>
            </Radio.Group>
          </Col>

          <Col xs={24} sm={24} md={24}>
            <Row align="middle" gutter={[10, 10]} justify={'end'}>
              <Col xs={24} sm={24} md={3}>
                <AntButton
                  label={t('show')}
                  htmlType="submit"
                  style={{ marginTop: 2 }}
                  isError={isError}
                  isLoading={isLoadingBRV || isFetching}
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
