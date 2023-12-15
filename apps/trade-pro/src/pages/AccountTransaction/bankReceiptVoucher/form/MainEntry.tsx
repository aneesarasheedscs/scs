import { AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Checkbox, Col, Row, FormInstance, Form } from 'antd';
import { map } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isWithHoldingCheckedAtom, totalValue } from './Atom';
import { useAtom } from 'jotai';
import {
  useGetAccountsBalance,
  useGetBankReceiptProjectSelect,
  useGetChequeNoSelect,
  useGetConfigration,
  useGetDebitAccountSelect,
  useGetWHTAgainstAcSelect,
} from '../queries/queries';

const MainEntry = ({ form, setBankId, bankId }: TDynamicForm) => {
  const { t } = useTranslation();
  const [totalDebitAmounts, setTotalDebitAmounts] = useAtom(totalValue);
  const { data } = useGetAccountsBalance(bankId);
  const { data: project, isSuccess, isLoading } = useGetBankReceiptProjectSelect();
  const [chequeBookEnabled, setChequeBookEnabled] = useState(false);
  const { data: debit } = useGetDebitAccountSelect();
  const { data: chequeBooks } = useGetChequeNoSelect(bankId);
  const { data: chequeNoCompulsoryConfig } = useGetConfigration('ChequeNoCompulsoryOnBpv');
  const isChequeNoCompulsory = chequeNoCompulsoryConfig?.data?.Data?.Result === 'True';
  const [isWithHoldingChecked, setIsWithHoldingChecked] = useAtom(isWithHoldingCheckedAtom);
  useEffect(() => {
    if (isSuccess && !isLoading) {
      form.setFieldValue('ProjectId', project?.data?.Data?.Result?.[0]?.ProjectName);
    }
  }, [isSuccess, !isLoading]);

  useEffect(() => {
    form.setFieldValue('VoucherAmount', totalDebitAmounts);
  }, [debit, bankId, totalDebitAmounts]);

  const handleDebitAccountChange = (accountId?: any) => {
    setBankId(accountId);
  };

  const handleCheckboxChangeforWHT = (isChecked: boolean, fieldName: string) => {
    setIsWithHoldingChecked(isChecked);
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };

  const { data: filter } = useGetWHTAgainstAcSelect();

  interface TVoucherType {
    Id: number;
    Type: string;
  }
  const voucherType: TVoucherType[] = [{ Id: 1, Type: 'BRV' }];

  const chequeBookOptions =
    chequeBooks?.data?.Data?.Result?.map((chequeBook: any) => ({
      label: chequeBook.CheqNo,
      value: chequeBook.Id,
    })) || [];

  return (
    <>
      <Row gutter={[10, 10]} style={{ marginTop: '-2%' }}>
        <Col span={24}>
          <Card style={{ paddingBottom: '0.5%', boxShadow: '2px 4px 12px 1px gray' }}>
            <div className="form-list-container">
              <Col
                xs={{ span: 23, offset: 0 }}
                sm={{ span: 22, offset: 1 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 8, offset: 0 }}
                xxl={{ span: 6, offset: 0 }}
                className="formfield project"
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('cost_center')}
                  fieldValue="Id"
                  fieldLabel="ProjectName"
                  name="ProjectId"
                  query={useGetBankReceiptProjectSelect}
                />
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 22, offset: 1 }}
                md={{ span: 11, offset: 1 }}
                lg={{ span: 11, offset: 1 }}
                xl={{ span: 6, offset: 1 }}
                xxl={{ span: 3, offset: 1 }}
                className="formfield voucher"
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('voucher_type')}
                  fieldValue="Id"
                  fieldLabel="Type"
                  name="Type"
                  options={map(voucherType, (item: any) => ({
                    value: item.Id,
                    label: item.Type,
                  }))}
                  defaultValue={1}
                />
              </Col>

              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 22, offset: 1 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 7, offset: 1 }}
                xxl={{ span: 5, offset: 1 }}
                className="formfield balance"
                style={{ marginTop: '-1.1rem', borderBottom: '1px solid gray', height: '50px' }}
              >
                <p style={{ marginLeft: '55%' }} className="cr">
                  Dr : <b> {data?.data?.Data?.Result?.[0]?.Balance.toFixed(2)}</b>
                </p>

                <p style={{ marginTop: -4 }}>
                  <AntSelectDynamic
                    required
                    bordered={false}
                    label={t('debit_account')}
                    fieldValue="Id"
                    fieldLabel="AccountTitle"
                    name="AccountId"
                    query={useGetDebitAccountSelect}
                    onChange={(accountId) => handleDebitAccountChange(accountId)}
                  />
                </p>
              </Col>
              <Col
                xs={{ span: 18, offset: 0 }}
                sm={{ span: 18, offset: 1 }}
                md={{ span: 9, offset: 1 }}
                lg={{ span: 9, offset: 1 }}
                xl={{ span: 6, offset: 0 }}
                xxl={{ span: 5, offset: 1 }}
                className="formfield against"
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('against_ac')}
                  fieldValue="Id"
                  fieldLabel="AccountTitle"
                  name="AgainstAccountId"
                  disabled={!isWithHoldingChecked}
                  options={map(filter, (item: any) => ({
                    value: item.Id,
                    label: item.AccountTitle,
                  }))}
                />
              </Col>
              <Col
                xs={{ span: 1 }}
                sm={{ span: 2 }}
                md={{ span: 1 }}
                lg={{ span: 1 }}
                xl={{ span: 2 }}
                xxl={{ span: 1 }}
                style={{ height: '20px' }}
                className="wht"
              >
                <Form.Item className="box" name="IncludeWHT" valuePropName="checked" initialValue={false}>
                  <Checkbox onChange={(e) => handleCheckboxChangeforWHT(e.target.checked, 'IncludeWHT')}>
                    {t('wht')}
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 22, offset: 1 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 6, offset: 1 }}
                xxl={{ span: 6, offset: 0 }}
                className="formfield date"
                style={{ marginTop: '1%' }}
              >
                <AntDatePicker bordered={false} name="ChequeDate" label={t('cheque_date')} />
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 22, offset: 1 }}
                md={{ span: 11, offset: 1 }}
                lg={{ span: 11, offset: 1 }}
                xl={{ span: 7, offset: 1 }}
                xxl={{ span: 3, offset: 1 }}
                className="formfield cheqno"
                style={{ marginTop: '1%' }}
              >
                {chequeBookEnabled ? (
                  <AntInput bordered={false} label={t('cheque_no')} name="CheqId" required={isChequeNoCompulsory} />
                ) : (
                  <AntSelectDynamic
                    bordered={false}
                    fieldValue="Id"
                    fieldLabel="ChequeNo"
                    name="CheqId"
                    label={t('cheque_no')}
                    required={isChequeNoCompulsory}
                    options={chequeBookOptions}
                  />
                )}
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 22, offset: 1 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 8, offset: 0 }}
                xxl={{ span: 12, offset: 1 }}
                className="formfield payment"
                style={{ marginTop: '1%' }}
              >
                <AntInput name="PayeeTitle" bordered={false} label={t('pay_title')} />
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 22, offset: 1 }}
                md={{ span: 11, offset: 1 }}
                lg={{ span: 11, offset: 1 }}
                xl={{ span: 14, offset: 1 }}
                xxl={{ span: 10, offset: 0 }}
                // style={{ marginTop: '1%' }}
                className="formfield remarks"
              >
                <AntInput bordered={false} name="Remarks" label={t('remarks')} />
              </Col>
              <AntInput bordered={false} label={t('')} name="VoucherAmount" style={{ display: 'none' }} />
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

type TDynamicForm = { form: FormInstance; setBankId: any; bankId: any };

export default MainEntry;
