import React, { useState } from 'react';
import { Checkbox, Radio } from 'antd';
import GeneralLedgerTable, { GeneralLedgerTableSummaryI, GeneralLedgerTableSummaryII } from '.';
import { useTranslation } from 'react-i18next';

interface SelectedValues {
  branchName: string;
  accountTitle: string;
}

const RadioButtons = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState(1);
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({
    branchName: '',
    accountTitle: '',
  });

  // BranchName
  const handleSelectedValuesChange = (branchName: string, accountTitle: string) => {
    setSelectedValues({
      branchName,
      accountTitle,
    });
  };
  let componentToRender;
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  switch (value) {
    case 1:
      componentToRender = (
        <GeneralLedgerTable selectedValuess={selectedValues} onSelectedValuesChange={handleSelectedValuesChange} />
      );
      break;
    case 2:
      componentToRender = <GeneralLedgerTableSummaryI />;
      break;
    case 3:
      componentToRender = <GeneralLedgerTableSummaryII />;
      break;

    default:
      componentToRender = null;
  }

  return (
    <div>
      <Radio.Group onChange={onChange} value={value}>
        <Checkbox.Group>
          <Checkbox value={1}>{t('include_unposted_vouchers')}</Checkbox>
        </Checkbox.Group>
        <Radio value={1}>{t('detail')}</Radio>
        <Radio value={2}>{t('summaryI')}</Radio>
        <Radio value={3}>{t('summaryII')}</Radio>
      </Radio.Group>
      <div>{componentToRender}</div>
    </div>
  );
};

export default RadioButtons;
