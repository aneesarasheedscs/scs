import React, { useState } from 'react';
import './style.scss';
import { Col, Row, Typography } from 'antd';
import RadioButtons from './tables/RadioButtons';
import AccountDetailCard from './GeneralLedger/AccountDetailCard';
import AccountBalanceCard from './GeneralLedger/AccountBalanceCard';
import AccountBalanceGraph from './GeneralLedger/AccountBalanceGraph';
import { useTranslation } from 'react-i18next';
import AccountsDetailSearchCriteriaForm from './tables/AccountsDetailSearchCriteriaForm';
import { useAtom } from 'jotai';
import { selectedItems } from '@tradePro/pages/accountReports/accountPayables/table/Atom';

const { Title, Text } = Typography;
interface SelectedValues {
  branchName: string;
  accountTitle: string;
}

interface TableCaptionProps {
  SelectedValues: SelectedValues;
  onSelectedValuesChange: (branchName: string, accountTitle: string) => void;
}
function AccountReports({ SelectedValues, onSelectedValuesChange }: TableCaptionProps) {
  const [selectedValues, SetSelectedValues] = useState<SelectedValues>({
    branchName: '',
    accountTitle: '',
  });

  // const handleBranchName = (branchName: string, accountTitle: string) => {
  //   SetSelectedValues({ branchName, accountTitle });
  // };
  const { t } = useTranslation();
  const { branchName, accountTitle } = selectedValues;

  const [selectedItem] = useAtom(selectedItems);

  const initialFormValues = {
    FromdateProp: selectedItem?.DueDateFrom,
    ToDateProp: selectedItem?.DueDateTo,
    Id: selectedItem?.Id,
  };

  const { FromdateProp, ToDateProp, Id } = initialFormValues;
  console.log(FromdateProp);
  return (
    <div className="cash-balances-container" style={{ backgroundColor: 'white' }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12} lg={8} style={{ marginLeft: '15px' }}>
          <Text className="breadcrumb">{t('general_ledger')}</Text>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <AccountBalanceCard />

        <AccountBalanceGraph />
        <AccountDetailCard />
      </Row>
      <Row justify={'start'}>
        <Col span={24}>
          {' '}
          {/* Align search criteria to the left */}
          <AccountsDetailSearchCriteriaForm
            FromdateProp={FromdateProp}
            ToDateProp={ToDateProp}
            Id={Id}
            onSelectedValuesChange={onSelectedValuesChange}
          />
        </Col>
      </Row>
      <Col xs={24} md={24} className="summary-card">
        <RadioButtons />
      </Col>
    </div>
  );
}

export default AccountReports;
