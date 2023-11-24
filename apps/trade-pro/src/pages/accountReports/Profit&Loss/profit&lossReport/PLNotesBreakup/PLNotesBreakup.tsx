import { AntButton, AntDatePicker, AntSelectDynamic } from '@tradePro/components';
import { Col, Form, Row } from 'antd';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { TProfitLossSearchCritaria } from '../type';
import { useGetProfitLossAccountNote, useGetProfitLossBreakup } from './query';
import { useLocation } from 'react-router-dom';

const { useForm, useWatch } = Form;

function PLNotesBreakupForm() {
  const { t } = useTranslation();
  const [form] = useForm<TProfitLossSearchCritaria>();
  const formValues = useWatch<TProfitLossSearchCritaria>([], form);
  const location = useLocation();

  const {
    filteredTotalSaleNet,
    filteredTotalCostOfSale,
    filteredTotalOtherExpense,
    filteredTotalAdministration,
    filteredTotalOperatingExpense,
  } = location.state || {};
  const filteredTotalSaleN = filteredTotalSaleNet?.[0]?.AccountNoteId;
  const filteredTotalCost = filteredTotalCostOfSale?.[0].AccountNoteId;
  const fillteredTotalOtherE = filteredTotalOtherExpense?.[0].AccountNoteId;
  const filteredTotalAdmin = filteredTotalAdministration?.[0].AccountNoteId;
  const fillteredTotalOpratingE = filteredTotalOperatingExpense?.[0].AccountNoteId;

  const {
    isFetching,
    data,
    refetch: refetch,
    isError: isProfitLossError,
    isLoading: isProfitLossLoading,
  } = useGetProfitLossBreakup(form.getFieldsValue());

  useEffect(() => {
    form.setFields([{ name: 'FromDate', value: '' }]);
    form.setFields([{ name: 'ToDate', value: dayjs(new Date()) }]);
    form.setFields([
      {
        name: 'AccountNoteId',
        value:
          filteredTotalSaleN ||
          filteredTotalCost ||
          fillteredTotalOtherE ||
          filteredTotalAdmin ||
          fillteredTotalOpratingE,
      },
    ]);
  }, []);

  const onFinish = (values: TProfitLossSearchCritaria) => {
    console.log(values);
    refetch();
  };

  return (
    <>
      <Form form={form} layout="horizontal" initialValues={formValues} onFinish={onFinish}>
        <Row gutter={[10, 10]} justify={'space-between'} style={{ marginTop: 10, marginLeft: 15 }}>
          <Col xs={20} sm={12} md={6} className="formfield">
            <AntDatePicker name="FromDate" label={t('from_date')} bordered={false} />
          </Col>
          <Col xs={20} sm={12} md={6} className="formfield">
            <AntDatePicker name="ToDate" label={t('to_date')} bordered={false} />
          </Col>
          <Col xs={20} sm={12} md={8} className="formfield">
            <AntSelectDynamic
              name="AccountNoteId"
              label={t('account_notes')}
              fieldLabel="NoteTitle"
              fieldValue="Id"
              query={useGetProfitLossAccountNote}
              bordered={false}
            />
          </Col>
          <Col xs={4} sm={3} md={2}>
            <AntButton
              label={t('show')}
              htmlType="submit"
              style={{ marginTop: 2 }}
              isError={isProfitLossError}
              isLoading={isProfitLossLoading || isFetching}
            />
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default PLNotesBreakupForm;
