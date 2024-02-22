import {
  AntButton,
  AntDatePicker,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import { useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useGetCustomer, useGetGdnRegister } from './queries';
import { gdnRegisterCriteria } from './type';
import { useTranslation } from 'react-i18next';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import dayjs from 'dayjs';

const { useForm, useWatch } = Form;

function SearchCriteria() {
  const [open, setOpen] = useState(false);
  const [form] = useForm<gdnRegisterCriteria>();
  const formValues = useWatch<gdnRegisterCriteria>([], form);

  const {
    refetch,
    isFetching,
    isError: isError,
    isLoading: isLoading,
  } = useGetGdnRegister(false, form.getFieldsValue());

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (_: gdnRegisterCriteria) => {
    refetch().then(() => handleClose());
  };

  const financialYear = storedFinancialYear();

  const FromDate = dayjs(financialYear?.Start_Period);
  const ToDate = dayjs(new Date());
  const { t } = useTranslation();

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="inline" initialValues={{ FromDate, ToDate }}>
        <Row gutter={[10, 10]} justify={'space-between'}>
          <Col xs={20} sm={12} md={12} xxl={12} className="formfield">
            <AntDatePicker name="FromDate" label={t('from_date')} bordered={false} />
          </Col>

          <Col xs={20} sm={11} md={11} xxl={11} className="formfield">
            <AntDatePicker name="ToDate" label={t('to_date')} bordered={false} />
          </Col>

          <Col xs={20} sm={12} md={12} className="formfield">
            <AntInputNumber name="GdnNoFrom" label={t('gdn_no_from')} bordered={false} />
          </Col>

          <Col xs={20} sm={11} md={11} className="formfield">
            <AntInputNumber name="GdnNoTo" label={t('gdn_no_to')} bordered={false} />
          </Col>

          <Col xs={20} sm={24} md={12} className="formfield">
            <AntSelectDynamic
              bordered={false}
              name="SupplierCustomerId"
              label={t('customer_name')}
              fieldValue="Id"
              fieldLabel="CompanyName"
              query={useGetCustomer}
            />
          </Col>

          <Col xs={6} sm={5} md={4} xxl={4}>
            <AntButton
              label={t('show')}
              htmlType="submit"
              style={{ marginTop: 2 }}
              isError={isError}
              isLoading={isLoading || isFetching}
            />
          </Col>
        </Row>
      </Form>
    </SearchCriteriaWrapper>
  );
}

export default SearchCriteria;
