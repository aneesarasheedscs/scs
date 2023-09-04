import { AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { Card, Col, Form, FormInstance, Row } from 'antd';
import {
  useGetAccountCompanies,
  useGetAccountGroup,
  useGetBSNotesData,
  useGetChartAccountType,
  useGetPLNotesData,
  useGetParentAccount,
} from '../queryOptions';
import { TChartAccount } from '../types';
import { useState } from 'react';
import { useParentAccountLeaveService } from './querie';
import { map } from 'lodash';

const { useWatch } = Form;

interface FormOfChartAccountProps {
  form: FormInstance;
  onSelectedValuesChange: (accountLevel: number, accountTitle: string) => void;
}
function FormOfChartAccount({ form, onSelectedValuesChange }: FormOfChartAccountProps) {
  const { setFields, getFieldValue } = form;
  const formValues = useWatch<TDynamicForm[]>('chartAccountDetailForm', form);

  const [parentAccountDataAvailable, setParentAccountDataAvailable] = useState(true);
  const [disableAccountGroup, setDisableAccountGroup] = useState(true);
  const [disableBSNotes, setDisableBSNotes] = useState(true);
  const [disablePLNotes, setDisablePLNotes] = useState(true);

  const initialValues = {
    AccountClass: '',
    AccountGroup: '',
    Account_Level: '',
    AccountCode: '',
    AccountType: '',
    CompanyId: '',
    PLNote: '',
    BsNote: '',
    AccountTitle: '',
  };
  const { data, isSuccess } = useParentAccountLeaveService();
  const handleItemChange = (obj: TChartAccount, index: number) => {
    if (obj?.AccountClass === 1) {
      setFields([{ name: ['chartAccountDetailForm', index, 'AccountClassName'], value: 'Capital' }]);
    } else if (obj?.AccountClass === 2) {
      setFields([{ name: ['chartAccountDetailForm', index, 'AccountClassName'], value: 'Assets' }]);
    } else if (obj?.AccountClass === 3) {
      setFields([{ name: ['chartAccountDetailForm', index, 'AccountClassName'], value: 'Liabilities' }]);
    } else if (obj?.AccountClass === 4) {
      setFields([{ name: ['chartAccountDetailForm', index, 'AccountClassName'], value: 'Expenses' }]);
    } else if (obj?.AccountClass === 5) {
      setFields([{ name: ['chartAccountDetailForm', index, 'AccountClassName'], value: 'Revenue' }]);
    }
    setFields([
      { name: ['chartAccountDetailForm', index, 'Account_Level'], value: obj?.Account_Level },
      { name: ['chartAccountDetailForm', index, 'AccountCode'], value: obj?.AccountCode },
      { name: ['chartAccountDetailForm', index, 'AccountGroup'], value: obj?.AccountGroup },
      { name: ['chartAccountDetailForm', index, 'AccountType'], value: obj?.AccountType },
      { name: ['chartAccountDetailForm', index, 'CompanyId'], value: obj?.CompanyId },
      { name: ['chartAccountDetailForm', index, 'PLNote'], value: obj?.PLNote },
      { name: ['chartAccountDetailForm', index, 'BsNote'], value: obj?.BsNote },
    ]);
    if (obj?.Account_Level === 3)
      setFields([
        {
          name: ['chartAccountDetailForm', index, 'AccountCode'],
          value: map(data?.data?.Data?.Result, (i) => i.AccountCode),
        },
        {
          name: ['chartAccountDetailForm', index, 'Account_Level'],
          value: map(data?.data?.Data?.Result, (i) => i.Account_Level),
        },
      ]);
    setParentAccountDataAvailable(obj.Account_Level === 3);
    setDisableAccountGroup(obj?.AccountGroup === 'Group');
    setDisableBSNotes(obj?.Account_Level === 3);
    setDisablePLNotes(obj?.Account_Level === 3);
    onSelectedValuesChange(obj?.Account_Level, obj?.AccountTitle);
  };
  return (
    <>
      <Card style={{ width: '98%', height: '100%' }} className="antCard card-shadow chartAccounts">
        <Form.List name="chartAccountDetailForm" initialValue={[initialValues]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <div key={field.key} className="form-list-container">
                  <Col span={12}>
                    <AntSelectDynamic
                      required
                      label="Parent Account"
                      className="select"
                      fieldValue="Id"
                      fieldLabel="AccountTitle"
                      query={useGetParentAccount}
                      name={[field.name, 'AccountTitle']}
                      onSelectChange={(obj) => handleItemChange(obj, field.name)}
                    />
                  </Col>

                  <Col span={11}>
                    <AntInput
                      formItemProps={{ ...field, name: [field.name, 'AccountClassName'] }}
                      label="Account Class"
                      className="input"
                      style={{ width: '100%', border: '1px dashed blue' }}
                      readOnly
                    />{' '}
                  </Col>
                  <Col xl={12} sm={12}>
                    <AntInput
                      formItemProps={{ ...field, name: [field.name, 'Account_Level'] }}
                      label="Account Level"
                      className="input"
                      style={{ width: '100%' }}
                      readOnly
                    />{' '}
                  </Col>
                  <Col xl={11} sm={11}>
                    <AntInput
                      formItemProps={{ ...field, name: [field.name, 'AccountCode'] }}
                      label="Account Code"
                      className="input"
                      style={{ width: '100%' }}
                      readOnly
                    />{' '}
                  </Col>
                  <Col span={12}>
                    <AntSelectDynamic
                      fieldLabel="Name"
                      fieldValue="Id"
                      name={[field.name, 'AccountGroup']}
                      label="Account Group"
                      className="select"
                      style={{ width: '97%' }}
                      query={useGetAccountGroup}
                      disabled={disableAccountGroup}
                    />{' '}
                  </Col>
                  <Col span={11}>
                    <AntSelectDynamic
                      label="Account Type"
                      className="select"
                      style={{ width: '100%' }}
                      fieldValue="Id"
                      fieldLabel="AccountType"
                      query={useGetChartAccountType}
                      name={[field.name, 'AccountType']}
                      disabled={parentAccountDataAvailable}
                      required={!parentAccountDataAvailable}
                    />{' '}
                  </Col>
                  <Col span={12}>
                    <AntInput
                      formItemProps={{ ...field, name: [field.name, 'Account-Title'] }}
                      label="Account Title"
                      className="input"
                      style={{ width: '100%' }}
                    />{' '}
                  </Col>

                  <Col span={11}>
                    <AntInput
                      formItemProps={{ ...field, name: [field.name, 'OtherCode'] }}
                      label="Other Code(Manual)"
                      className="input"
                      style={{ width: '100%' }}
                    />{' '}
                  </Col>
                  <Col span={12}>
                    <AntInput
                      formItemProps={{ ...field, name: [field.name, 'OpeningBalance'] }}
                      label="Opening Balance"
                      className="input"
                      style={{ width: '100%' }}
                    />
                  </Col>
                  <Col span={11}>
                    <AntSelectDynamic
                      label="PL Notes"
                      className="select"
                      style={{ width: '100%' }}
                      fieldValue="Id"
                      fieldLabel="NoteTitle"
                      query={useGetPLNotesData}
                      name={[field.name, 'PLNote']}
                      disabled={disablePLNotes}
                    />{' '}
                  </Col>
                  <Col span={12}>
                    <AntSelectDynamic
                      label="BS Notes"
                      className="select"
                      style={{ width: '100%' }}
                      fieldValue="Id"
                      fieldLabel="NoteTitle"
                      query={useGetBSNotesData}
                      name={[field.name, 'BsNote']}
                      disabled={disableBSNotes}
                    />{' '}
                  </Col>
                  <Col span={11}>
                    <AntInput
                      formItemProps={{ ...field, name: [field.name, 'CityName'] }}
                      label="City Name"
                      className="input"
                      style={{ width: '100%', border: '1px dashed blue' }}
                      readOnly
                    />{' '}
                  </Col>
                  <Col span={12}>
                    <AntInput
                      formItemProps={{ ...field, name: [field.name, 'PhoneNumber'] }}
                      placeholder="0000-0000000"
                      label="Phone Number"
                      className="input"
                      style={{ width: '100%', border: '1px dashed blue' }}
                      readOnly
                    />{' '}
                  </Col>

                  <Col span={22}>
                    <AntSelectDynamic
                      label="Companies"
                      className="select"
                      fieldValue="Id"
                      fieldLabel="CompName"
                      style={{ width: '102%' }}
                      name={[field.name, 'CompanyId']}
                      query={useGetAccountCompanies}
                    />{' '}
                  </Col>
                </div>
              ))}
            </>
          )}
        </Form.List>
      </Card>
    </>
  );
}
type TDynamicForm = { form: FormInstance };
export default FormOfChartAccount;
