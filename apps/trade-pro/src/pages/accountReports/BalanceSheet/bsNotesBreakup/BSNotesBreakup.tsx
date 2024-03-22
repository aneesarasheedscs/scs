import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Col, Form, Row } from 'antd';
import BSNotesBreakupTable from './table';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { TBalanceSheetSearchCritaria } from '../types';
import { AntButton, AntDatePicker, AntSelectDynamic } from '@tradePro/components';
import { useGetBalanceSheet2, useGetBalanceSheetAccountNote, useGetBalanceSheetPlNotes } from './query';

const { useForm, useWatch } = Form;

function BSNotesBreakupForm({ balanceSheetBreakUps }: any) {
  const { t } = useTranslation();
  const [form] = useForm<TBalanceSheetSearchCritaria>();
  const formValues = useWatch<TBalanceSheetSearchCritaria>([], form);
  const location = useLocation();
  const {
    shareCapital,
    creditorsPaddyRices,
    salariesPayables,
    shareDeposit,
    tradeCreditors,
    netProfitLoss,
    otherCreditors,
  } = location.state || {};
  const { propertyPlantEquipment, cashBankBalances, stockInTrade, tradeDebtorLocal } = location.state || {};
  const shareCapitalId = shareCapital?.[0]?.AccountNoteId;
  const shareDeposits = shareDeposit?.[0]?.AccountNoteId;
  const netProfitLoses = netProfitLoss?.[0]?.AccountNoteId;
  const salariesPayabless = salariesPayables?.[0]?.AccountNoteId;
  const creditorsPaddyRicess = creditorsPaddyRices?.[0]?.AccountNoteId;
  const tradeCreditorsService = tradeCreditors?.[0]?.AccountNoteId;
  const otherCreditorss = otherCreditors?.[0]?.AccountNoteId;
  const propertyPlantEquipments = propertyPlantEquipment?.[0]?.AccountNoteId;
  const cashandBankBalances = cashBankBalances?.[0]?.AccountNoteId;
  const stockInTrades = stockInTrade?.[0]?.AccountNoteId;
  const tradeDebtorLocals = tradeDebtorLocal?.[0]?.AccountNoteId;
  console.log(shareCapital);

  const {
    isFetching,
    refetch: refetch,
    isError: isBalanceSheetError,
    isLoading: isBalanceSheetLoading,
  } = useGetBalanceSheet2(form.getFieldsValue());

  useEffect(() => {
    form.setFields([{ name: 'FromDate', value: '' }]);
    form.setFields([{ name: 'ToDate', value: dayjs(new Date()) }]);
    form.setFields([
      {
        name: 'AccountNoteId',
        value:
          shareCapitalId ||
          netProfitLoses ||
          shareDeposits ||
          salariesPayabless ||
          creditorsPaddyRicess ||
          tradeCreditorsService ||
          otherCreditorss ||
          propertyPlantEquipments ||
          cashandBankBalances ||
          stockInTrades ||
          tradeDebtorLocals,
      },
    ]);
  }, []);

  const onFinish = (values: TBalanceSheetSearchCritaria) => {
    console.log(values);
    refetch();
  };

  return (
    <>
      <Form form={form} layout="horizontal" initialValues={formValues} onFinish={onFinish}>
        <Row gutter={[10, 10]} style={{ marginTop: 10, marginLeft: 15 }}>
          <Col xs={20} sm={12} md={4} className="formfield">
            <AntDatePicker name="FromDate" label={t('from_date')} bordered={false} />
          </Col>
          <Col xs={20} sm={12} md={4} className="formfield" offset={1}>
            <AntDatePicker name="ToDate" label={t('to_date')} bordered={false} />
          </Col>
          <Col xs={20} sm={12} md={5} className="formfield" offset={1}>
            <AntSelectDynamic
              name="AccountNoteId"
              label={t('account_notes')}
              fieldLabel="NoteTitle"
              fieldValue="Id"
              query={balanceSheetBreakUps == false ? useGetBalanceSheetAccountNote : useGetBalanceSheetPlNotes}
              bordered={false}
            />
          </Col>

          <Col xs={4} sm={3} md={2} offset={1}>
            <AntButton
              label={t('show')}
              htmlType="submit"
              style={{ marginTop: 2 }}
              isError={isBalanceSheetError}
              isLoading={isBalanceSheetLoading || isFetching}
            />
          </Col>
        </Row>
        <BSNotesBreakupTable
          shareCapital={shareCapital}
          salariesPayables={salariesPayables}
          creditorsPaddyRices={creditorsPaddyRices}
          tradeCreditors={tradeCreditors}
          otherCreditors={otherCreditors}
          propertyPlantEquipment={propertyPlantEquipment}
          cashBankBalances={cashBankBalances}
          stockInTrade={stockInTrade}
          tradeDebtorLocal={tradeDebtorLocal}
        />
      </Form>
    </>
  );
}

export default BSNotesBreakupForm;
