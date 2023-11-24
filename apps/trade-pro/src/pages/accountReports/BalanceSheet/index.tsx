import { AntButton, AntDatePicker } from '@tradePro/components';
import { Col, Form, Row } from 'antd';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { TBalanceSheetSearchCritaria } from './types';
import BalanceSheetAssetsCards from './BalanceSheetCards';
import LiabilitiesCards from './LiabilitiesCards';
import { useGetBalanceSheet2 } from './query';
import { sumBy } from 'lodash';

const { useForm, useWatch } = Form;

function BalanceSheet() {
  const { t } = useTranslation();
  const [form] = useForm<TBalanceSheetSearchCritaria>();
  const formValues = useWatch<TBalanceSheetSearchCritaria>([], form);

  const {
    data,
    refetch,
    isFetching,
    isError: isBalanceSheetError,
    isLoading: isBalanceSheetLoading,
  } = useGetBalanceSheet2(form.getFieldsValue());

  const rawData = data?.data?.Data.Result || [];
  const netProfitLoss = rawData.filter((item: any) => item.AccountNoteId === 10);
  const stockInTrade = rawData.filter((item: any) => item.AccountNoteId === 12);
  const tradeDebtorLocal = rawData.filter((item: any) => item.AccountNoteId === 13);
  const loanAndAdvances = rawData.filter((item: any) => item.AccountNoteId === 16);
  const taxation = rawData.filter((item: any) => item.AccountNoteId === 17);
  const cashBankBalances = rawData.filter((item: any) => item.AccountNoteId === 20);
  const longTermLoans = rawData.filter((item: any) => item.AccountNoteId === 21);
  const shortTermBorrowings = rawData.filter((item: any) => item.AccountNoteId === 22);
  const salariesPayables = rawData.filter((item: any) => item.AccountNoteId === 23);
  const creditorsPaddyRices = rawData.filter((item: any) => item.AccountNoteId === 24);
  const tradeCreditors = rawData.filter((item: any) => item.AccountNoteId === 25);
  const creditorsStore = rawData.filter((item: any) => item.AccountNoteId === 26);
  const otherCreditors = rawData.filter((item: any) => item.AccountNoteId === 27);
  const tradeOthersPayables = rawData.filter((item: any) => item.AccountNoteId === 28);
  const shareCapital = rawData.filter((item: any) => item.AccountNoteId === 29);
  const propertyPlantEquipment = rawData.filter((item: any) => item.AccountNoteId === 30);
  const unAppropriated = rawData.filter((item: any) => item.AccountNoteId === 34);
  const reserve = rawData.filter((item: any) => item.AccountNoteId === 35);
  const shareDeposit = rawData.filter((item: any) => item.AccountNoteId === 36);
  const financialLease = rawData.filter((item: any) => item.AccountNoteId === 37);
  const creditorsAccruedLiabilities = rawData.filter((item: any) => item.AccountNoteId === 38);

  // console.log(shareCapital?.[0]?.AccountNoteId);

  useEffect(() => {
    form.setFields([{ name: 'ToDate', value: dayjs(new Date()) }]);
  }, []);

  const onFinish = (values: TBalanceSheetSearchCritaria) => {
    console.log(values);
    refetch();
  };
  const totalstockAmount = sumBy(stockInTrade, 'Amount');
  const totalCreditorsAmount = sumBy(creditorsPaddyRices, 'Amount');
  const totalcashBankBalancesAmount = sumBy(cashBankBalances, 'Amount');
  const totaltradeDebtorLocalAmount = sumBy(tradeDebtorLocal, 'Amount');
  const totalshareCapitalAmount = sumBy(shareCapital, 'Amount');
  const totalshareDepositAmount = sumBy(shareDeposit, 'Amount');
  const totalUnAppropriatedAmount = sumBy(unAppropriated, 'Amount');
  const totalReserveAmount = sumBy(reserve, 'Amount');
  const totalsalariesPayablesAmount = sumBy(salariesPayables, 'Amount');
  const totaltradeCreditorsAmount = sumBy(tradeCreditors, 'Amount');
  const totalotherCreditorsAmount = sumBy(otherCreditors, 'Amount');
  const totalpropertyPlantEquipment = sumBy(propertyPlantEquipment, 'Amount');
  const totalNetProfitLoss = sumBy(netProfitLoss, 'Amount');
  const totalfinancialLeaseAmount = sumBy(financialLease, 'Amount');
  const totallongTermLoansAmount = sumBy(longTermLoans, 'Amount');
  const totalTaxationAmount = sumBy(taxation, 'Amount');
  const totalShortTermBorrowingsAmount = sumBy(shortTermBorrowings, 'Amount');
  const totaltradeOthersPayablesAmount = sumBy(tradeOthersPayables, 'Amount');
  const totalloanAndAdvancesAmount = sumBy(loanAndAdvances, 'Amount');
  const totalcreditorsStoreAmount = sumBy(creditorsStore, 'Amount');
  const totalcreditorsAccruedLiabilitiesAmount = sumBy(creditorsAccruedLiabilities, 'Amount');
  // console.log(totalUnAppropriatedAmount);
  return (
    <>
      <h2 className="form-heading"> {t('balance_sheet')} </h2>
      <Form form={form} layout="horizontal" initialValues={formValues} onFinish={onFinish}>
        <Row gutter={[10, 10]} style={{ marginTop: 10, marginLeft: 15 }}>
          <Col xs={20} sm={12} md={8} className="formfield">
            <AntDatePicker name="ToDate" label={t('to_date')} bordered={false} />
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
        <LiabilitiesCards
          shareCapital={shareCapital}
          shareDeposit={shareDeposit}
          unAppropriated={unAppropriated}
          reserve={reserve}
          netProfitLoss={netProfitLoss}
          financialLease={financialLease}
          longTermLoans={longTermLoans}
          taxation={taxation}
          shortTermBorrowings={shortTermBorrowings}
          salariesPayables={salariesPayables}
          creditorsPaddyRices={creditorsPaddyRices}
          tradeCreditors={tradeCreditors}
          otherCreditors={otherCreditors}
          loanAndAdvances={loanAndAdvances}
          creditorsStore={creditorsStore}
          creditorsAccruedLiabilities={creditorsAccruedLiabilities}
          totalotherCreditorsAmount={totalotherCreditorsAmount}
          totaltradeCreditorsAmount={totaltradeCreditorsAmount}
          totalsalariesPayablesAmount={totalsalariesPayablesAmount}
          totalshareCapitalAmount={totalshareCapitalAmount}
          totalshareDepositAmount={totalshareDepositAmount}
          totalReserveAmount={totalReserveAmount}
          totalUnAppropriatedAmount={totalUnAppropriatedAmount}
          totalCreditorsAmount={totalCreditorsAmount}
          totalNetProfitLoss={totalNetProfitLoss}
          totalfinancialLeaseAmount={totalfinancialLeaseAmount}
          totallongTermLoansAmount={totallongTermLoansAmount}
          totalTaxationAmount={totalTaxationAmount}
          totalShortTermBorrowingsAmount={totalShortTermBorrowingsAmount}
          totaltradeOthersPayablesAmount={totaltradeOthersPayablesAmount}
          totalloanAndAdvancesAmount={totalloanAndAdvancesAmount}
          totalcreditorsStoreAmount={totalcreditorsStoreAmount}
          totalcreditorsAccruedLiabilitiesAmount={totalcreditorsAccruedLiabilitiesAmount}
        />
        <BalanceSheetAssetsCards
          propertyPlantEquipment={propertyPlantEquipment}
          cashBankBalances={cashBankBalances}
          stockInTrade={stockInTrade}
          tradeDebtorLocal={tradeDebtorLocal}
          totalpropertyPlantEquipment={totalpropertyPlantEquipment}
          totalstockAmount={totalstockAmount}
          totalcashBankBalancesAmount={totalcashBankBalancesAmount}
          totaltradeDebtorLocalAmount={totaltradeDebtorLocalAmount}
        />
      </Form>
    </>
  );
}

export default BalanceSheet;
