import { AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Col, Form, FormInstance, Row } from 'antd';
import {
  useGetAccountCompanies,
  useGetAccountGroup,
  useGetBSNotesData,
  useGetChartAccountType,
  useGetCity,
  useGetPLNotesData,
  useGetParentAccount,
} from '../queryOptions';
import { TChartAccount, TChartAccountData } from '../types';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { selectedChildRowsAtom } from './Atom';
import { t } from 'i18next';

const { useWatch } = Form;

interface FormOfChartAccountProps {
  data: any;
  form: FormInstance;
  isLoading: any;
  isSuccess: any;
  onSelectedValuesChange: (accountLevel: number, accountTitle: string) => void;
}
function FormOfChartAccount({ data, isSuccess, form, isLoading, onSelectedValuesChange }: FormOfChartAccountProps) {
  const { setFields, getFieldValue } = form;
  const formValues = useWatch<TChartAccountData>([], form);
  const [selectedChildRows, setSelectedChildRows] = useAtom(selectedChildRowsAtom);
  const [parentAccountDataAvailable, setParentAccountDataAvailable] = useState(true);
  const [disableAccountGroup, setDisableAccountGroup] = useState(true);
  const [disableCityName, setDisableCityName] = useState(true);
  const [disableBSNotes, setDisableBSNotes] = useState(true);
  const [disablePLNotes, setDisablePLNotes] = useState(true);

  const handleItemChange = (obj: TChartAccount, index: string) => {
    if (obj?.AccountClass === 1) {
      setFields([{ name: ['AccountClass'], value: 'Capital' }]);
    } else if (obj?.AccountClass === 2) {
      setFields([{ name: ['AccountClass'], value: 'Assets' }]);
    } else if (obj?.AccountClass === 3) {
      setFields([{ name: ['AccountClass'], value: 'Liabilities' }]);
    } else if (obj?.AccountClass === 4) {
      setFields([{ name: ['AccountClass'], value: 'Expenses' }]);
    } else if (obj?.AccountClass === 5) {
      setFields([{ name: ['AccountClass'], value: 'Revenue' }]);
    }
    setFields([
      { name: 'ParentAccountCode', value: obj?.AccountCode },
      { name: 'AccountGroup', value: obj?.AccountGroup },
      { name: 'CompanyId', value: obj?.CompanyId },
      { name: 'PLNote', value: obj?.PLNoteId },
      { name: 'BsNote', value: obj?.BSNoteId },
    ]);
    if (obj?.Account_Level === 3) {
      setFields([{ name: 'AccountGroup', value: 'Detail' }]);
    }

    setParentAccountDataAvailable(obj.Account_Level === 3 || obj.Account_Level === 1);
    setDisableCityName(obj.Account_Level === 2 || obj.Account_Level === 1);
    setDisableAccountGroup(obj?.Account_Level === 2 || obj?.Account_Level === 1);
    setDisableBSNotes(obj?.Account_Level === 3 || obj?.Account_Level === 1);
    setDisablePLNotes(obj?.Account_Level === 3 || obj?.Account_Level === 1);
    onSelectedValuesChange(obj?.Account_Level, obj?.AccountTitle);
  };
  useEffect(() => {
    if (isSuccess && !isLoading) {
      setFields([
        {
          name: 'AccountCode',
          value: data?.data?.Data?.Result?.[0]?.AccountCode,
        },
        {
          name: 'Account_Level',
          value: data?.data?.Data?.Result?.[0]?.Account_Level,
        },
        {
          name: 'AccountType',
          value: data?.data?.Data?.Result?.[0]?.AccountType,
        },
      ]);
    }
  }, [isLoading, isSuccess, formValues]);
  if (selectedChildRows && selectedChildRows.length > 0) {
    setFields([
      {
        name: 'ParentCodeId',
        value: selectedChildRows?.[0]?.AccountTitle,
      },
      { name: 'ParentAccountCode', value: selectedChildRows?.[0]?.AccountCode },

      {
        name: 'AccountCode',
        value: data?.data?.Data?.Result?.[0]?.AccountCode,
      },
      {
        name: 'Account_Level',
        value: data?.data?.Data?.Result?.[0]?.Account_Level,
      },
      {
        name: 'AccountType',
        value: data?.data?.Data?.Result?.[0]?.AccountType,
      },
      {
        name: 'AccountClass',
        value:
          selectedChildRows?.[0]?.AccountClass === 2
            ? 'Assets'
            : 'Capital' && selectedChildRows?.[0]?.AccountClass === 3
            ? 'Liabilities'
            : 'Expense' && selectedChildRows?.[0]?.AccountClass === 4
            ? 'Expense'
            : '',
      },
    ]);
  }
  return (
    <>
      <Card style={{ width: '98%', height: '100%' }} className="antCard card-shadow chartAccounts">
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <AntSelectDynamic
              required
              label={t('parent_category')}
              className="select"
              fieldValue="Id"
              fieldLabel="AccountTitle"
              query={useGetParentAccount}
              name="ParentCodeId"
              onSelectChange={(obj) => handleItemChange(obj, 'ParentCodeId')}
            />
          </Col>

          <Col span={11}>
            <AntInput
              name="AccountClass"
              label={t('account_class')}
              className="input"
              style={{ width: '100%', border: '1px dashed blue' }}
              readOnly
            />{' '}
          </Col>
          <Col xl={12} sm={12}>
            <AntInput
              name="Account_Level"
              label={t('account_level')}
              className="input"
              style={{ width: '100%' }}
              readOnly
            />{' '}
          </Col>
          <Col xl={11} sm={11}>
            <AntInput
              name="AccountCode"
              label={t('account_code')}
              className="input"
              style={{ width: '100%' }}
              readOnly
            />{' '}
          </Col>
          <Col span={12}>
            <AntSelectDynamic
              fieldLabel="Name"
              fieldValue="Id"
              name="AccountGroup"
              label={t('account_group')}
              className="select"
              style={{ width: '97%' }}
              query={useGetAccountGroup}
              disabled={disableAccountGroup}
              required={!disableAccountGroup}
            />{' '}
          </Col>
          <Col span={11}>
            <AntSelectDynamic
              label={t('account_type')}
              className="select"
              style={{ width: '100%' }}
              fieldValue="Id"
              fieldLabel="AccountType"
              query={useGetChartAccountType}
              name="AccountTypeId"
              disabled={parentAccountDataAvailable}
              required={!parentAccountDataAvailable}
            />{' '}
          </Col>
          <Col span={12}>
            <AntInput
              required
              name="AccountTitle"
              label={t('account_title')}
              className="input"
              style={{ width: '100%' }}
            />{' '}
          </Col>

          <Col span={11}>
            <AntInput name="OtherErpCode" label={t('other_code')} className="input" style={{ width: '100%' }} />{' '}
          </Col>
          <Col span={12}>
            <AntInput name="OpeningBalance" label={t('opening_balance')} className="input" style={{ width: '100%' }} />
          </Col>
          <Col span={11}>
            <AntSelectDynamic
              label={t('pl_notes')}
              className="select"
              style={{ width: '100%' }}
              fieldValue="Id"
              fieldLabel="NoteTitle"
              query={useGetPLNotesData}
              name="PLNoteId"
              disabled={disablePLNotes}
              required={!disablePLNotes}
            />{' '}
          </Col>
          <Col span={12}>
            <AntSelectDynamic
              label={t('bs_notes')}
              className="select"
              style={{ width: '100%' }}
              fieldValue="Id"
              fieldLabel="NoteTitle"
              query={useGetBSNotesData}
              name="BSNoteId"
              disabled={disableBSNotes}
              required={!disableBSNotes}
            />
          </Col>
          <Col span={11}>
            <AntSelectDynamic
              label={t('city_name')}
              className="select"
              style={{ width: '100%' }}
              fieldValue="Id"
              fieldLabel="CityName"
              query={useGetCity}
              name="CityId"
              aria-readonly
              disabled={disableCityName}
            />
          </Col>
          <Col span={12}>
            <AntInput
              name={t('phone_number')}
              placeholder="0000-0000000"
              label="Phone Number"
              className="input"
              style={{ width: '100%', border: '1px dashed blue' }}
              readOnly
            />{' '}
          </Col>

          <Col span={4}>
            <AntInput
              name="ParentAccountCode"
              label=""
              className="input"
              style={{ width: '100%', display: 'none' }}
              readOnly
            />{' '}
          </Col>

          <Col span={22}>
            <AntSelectDynamic
              mode="multiple"
              label={t('companies')}
              className="select"
              fieldValue="Id"
              fieldLabel="CompName"
              style={{ width: '102%' }}
              name="CompanyId"
              query={useGetAccountCompanies}
            />{' '}
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default FormOfChartAccount;
