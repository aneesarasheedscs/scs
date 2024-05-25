import {
  AntButton,
  AntDatePicker,
  AntInput,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { CriteriaRowGutter } from '@tradePro/globalAtoms';
import { TAccountsPrematureReceiptsSearchCriteria } from '../types';
import {
  useGetAccountsPrematureReceiptHistory,
  useGetReceiverAccount,
  useGetRepresentativeAccount,
  useGetSenderAccount,
} from '../queries';
import { map } from 'lodash';
const { useForm, useWatch } = Form;

function SearchCriteria() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const financialYear = storedFinancialYear();
  const [form] = useForm<TAccountsPrematureReceiptsSearchCriteria>();
  const formValues = useWatch<TAccountsPrematureReceiptsSearchCriteria>([], form);
  const {
    refetch,
    isFetching,
    isError: isPrematureError,
    isLoading: isPrematureLoading,
  } = useGetAccountsPrematureReceiptHistory(true, form.getFieldsValue());

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (_: TAccountsPrematureReceiptsSearchCriteria) => {
    _.FromDate = new Date((_.FromDate as Date).toISOString().split('T')[0]);
    _.ToDate = new Date((_.ToDate as Date).toISOString().split('T')[0]);
    refetch().then(() => handleClose());
  };

  useEffect(() => {
    const januaryFirst = dayjs().startOf('year').set('month', 0).set('date', 1);
    form.setFields([{ name: 'FromDate', value: dayjs(financialYear?.Start_Period) }]);
    form.setFields([{ name: 'ToDate', value: dayjs(new Date()) }]);
  }, []);
  const voucherType: TVoucherType[] = [
    {
      Id: 3,
      Name: 'CRV',
    },
    {
      Id: 4,
      Name: 'BRV',
    },
    {
      Id: 5,
      Name: 'JV',
    },
  ];
  const handleVoucherTypeChange = (Id: number) => {
    if (Id === 3) {
      form.setFieldValue('VoucherType', 'CRV');
    } else if (Id === 4) {
      form.setFieldValue('VoucherType', 'BRV');
    } else if (Id === 5) {
      form.setFieldValue('VoucherType', 'JV');
    } else {
      form.setFieldValue('VoucherType', '');
    }
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
            <AntSelectDynamic
              fieldValue="Id"
              label={t('representative_account')}
              query={useGetRepresentativeAccount}
              fieldLabel="PartyName"
              name="RepresentativeAcId"
              bordered={false}
            />{' '}
          </Col>

          <Col xs={24} sm={24} md={11} className="formfield">
            <AntSelectDynamic
              fieldValue="Id"
              label={t('sender_account')}
              query={useGetSenderAccount}
              fieldLabel="AccountTitle"
              name="SenderAcId"
              bordered={false}
            />{' '}
          </Col>

          <Col xs={24} sm={24} md={12} className="formfield">
            <AntSelectDynamic
              bordered={false}
              label={t('voucher_type')}
              fieldValue="Id"
              fieldLabel="Name"
              name="VoucherTypeId"
              options={map(voucherType, (item) => ({
                value: item.Id,
                label: item.Name,
              }))}
              onSelect={(Id) => handleVoucherTypeChange(Id)}
            />
            <AntInput name="VoucherType" label="" style={{ display: 'none' }} />
          </Col>

          <Col xs={24} sm={24} md={11} className="formfield">
            <AntSelectDynamic
              fieldValue="Id"
              label={t('receiver_account')}
              query={() => useGetReceiverAccount(form.getFieldValue('VouchersId'))}
              fieldLabel="AccountTitle"
              name="ReceiverAcId"
              bordered={false}
            />
          </Col>
          <Col xs={24} sm={24} md={12}></Col>
          <Col xs={24} sm={24} md={3}>
            <AntButton
              label={t('show')}
              htmlType="submit"
              style={{ marginTop: 2 }}
              isError={isPrematureError}
              isLoading={isPrematureLoading || isFetching}
            />
          </Col>
        </Row>
      </Form>
    </SearchCriteriaWrapper>
  );
}

export default SearchCriteria;
interface TVoucherType {
  Id: number;
  Name: string;
}
