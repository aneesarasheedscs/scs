import { AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Checkbox, Col, Row, Form, FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  useGetAccountsBalance,
  useGetCreditAccountSelect,
  useGetTaxSchedule,
  useGetWHTAgainstAcSelect,
} from '../queries/queries';
import { map } from 'lodash';
import { useEffect } from 'react';
import { isWithHoldingCheckedAtom, selectedCreditAccountAtom, totalValue, selectedAgainstAccountAtom } from './Atom';
import { useAtom } from 'jotai';

function MainEntry({ form, setBankId, bankId }: TDynamicForm) {
  const { t } = useTranslation();
  const { data: getTaxSchedule } = useGetTaxSchedule();
  const [totalDebitAmounts, setTotalDebitAmounts] = useAtom(totalValue);
  const { data: credit } = useGetCreditAccountSelect();
  const { data } = useGetAccountsBalance(bankId);
  const [selectedCreditAccount, setSelectedCreditAccount] = useAtom(selectedCreditAccountAtom);
  const [againstAccountAtom, setAgainstAccountAtom] = useAtom(selectedAgainstAccountAtom);
  const [isWithHoldingChecked, setIsWithHoldingChecked] = useAtom(isWithHoldingCheckedAtom);
  const { data: filter } = useGetWHTAgainstAcSelect();

  useEffect(() => {
    form.setFieldValue('VoucherAmount', totalDebitAmounts);
  }, [credit, bankId, totalDebitAmounts]);

  const handleCreditAccountChange = (accountId?: any) => {
    setSelectedCreditAccount(accountId);
    setBankId(accountId);
  };
  const handleAgainstAccountChange = (accountId?: any) => {
    setAgainstAccountAtom(accountId);

    form.setFieldValue(['voucherDetailList', 0, 'AgainstAccountId'], accountId);
  };
  const handleCheckboxChange = (isChecked: boolean, fieldName: string) => {
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };
  const handleCheckboxChangeforWHT = (isChecked: boolean, fieldName: string) => {
    setIsWithHoldingChecked(isChecked);
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
    if (isChecked) {
      form.setFieldValue(['voucherDetailList', 0, 'TaxPrcnt'], getTaxSchedule?.data?.Data?.Result?.[0]?.TaxPercent);
      form.setFieldValue(['voucherDetailList', 0, 'AgainstAccountId'], 21321);
      form.setFieldValue('AgainstAccountId', 21321);
    } else if (!isChecked) {
      form.setFieldValue(['voucherDetailList', 0, 'TaxPrcnt'], 0);
      form.setFieldValue('AgainstAccountId', 21321);
      form.setFieldValue(['voucherDetailList', 0, 'AgainstAccountId'], null);
    }
  };
  interface TVoucherType {
    Id: number;
    Type: string;
  }
  const voucherType: TVoucherType[] = [{ Id: 1, Type: 'BPV' }];

  return (
    <>
      <Row gutter={[10, 10]} style={{ marginTop: '-1%' }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card style={{ paddingBottom: '0.5%', boxShadow: '2px 4px 12px 1px gray' }}>
            <Row gutter={[10, 10]} justify={'space-between'} style={{ marginLeft: 10 }}>
              <Col
                xs={{ span: 20 }}
                sm={{ span: 21 }}
                md={{ span: 11 }}
                lg={{ span: 11 }}
                xl={{ span: 6 }}
                xxl={{ span: 4 }}
                className="formfield  "
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('voucher_type')}
                  fieldValue="Id"
                  fieldLabel="Type"
                  name="Id"
                  options={map(voucherType, (item: any) => ({
                    value: item.Id,
                    label: item.Type,
                  }))}
                  defaultValue={1}
                />
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 21 }}
                md={{ span: 11 }}
                lg={{ span: 11 }}
                xl={{ span: 7 }}
                xxl={{ span: 5 }}
                className="formfield "
              >
                <AntDatePicker bordered={false} name="VoucherDate" label={t('voucher_date')} />
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 21 }}
                md={{ span: 11 }}
                lg={{ span: 11 }}
                xl={{ span: 10 }}
                xxl={{ span: 7 }}
                className="formfield"
              >
                <p style={{ marginTop: -18, marginLeft: '65%' }}>
                  Cr : <b> {data?.data?.Data?.Result?.[0]?.Balance.toFixed(2)}</b>
                </p>

                <p style={{ marginTop: -4 }}>
                  <AntSelectDynamic
                    required
                    bordered={false}
                    label={t('credit_account')}
                    fieldValue="Id"
                    fieldLabel="AccountTitle"
                    name="RefAccountId"
                    query={useGetCreditAccountSelect}
                    onChange={(accountId) => handleCreditAccountChange(accountId)}
                  />
                </p>
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 21 }}
                md={{ span: 11 }}
                lg={{ span: 11 }}
                xl={{ span: 9 }}
                xxl={{ span: 6 }}
                className="formfield"
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('wht_against_ac')}
                  fieldValue="Id"
                  fieldLabel="AccountTitle"
                  name="AgainstAccountId"
                  disabled={!isWithHoldingChecked}
                  options={map(filter, (item: any) => ({
                    value: item.Id,
                    label: item.AccountTitle,
                  }))}
                  onChange={(accountId) => handleAgainstAccountChange(accountId)}
                />
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 21 }}
                md={{ span: 24 }}
                lg={{ span: 11 }}
                xl={{ span: 10 }}
                style={{ marginTop: '' }}
                className="formfield"
              >
                <AntInput bordered={false} name="Remarks" label={t('remarks')} />
                <AntInput bordered={false} label={t('')} name="VoucherAmount" style={{ display: 'none' }} />
              </Col>
              <Col
                xs={{ span: 12 }}
                sm={{ span: 7 }}
                md={{ span: 6 }}
                lg={{ span: 5 }}
                xl={{ span: 4 }}
                xxl={{ span: 5 }}
                style={{ marginTop: '0.5%' }}
                className="checkbox"
              >
                <label>
                  <Form.Item name="IsTaxable" valuePropName="checked" initialValue={true}>
                    <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'IsTaxable')}>
                      {t('print_preview')}
                    </Checkbox>
                  </Form.Item>
                </label>
              </Col>
              <Col
                xs={{ span: 10 }}
                sm={{ span: 17 }}
                md={{ span: 18 }}
                lg={{ span: 5 }}
                xl={{ span: 5 }}
                style={{ marginTop: '0.5%' }}
                className="checkbox"
              >
                <Form.Item name="IncludeWHT" valuePropName="checked" initialValue={false}>
                  <Checkbox onChange={(e) => handleCheckboxChangeforWHT(e.target.checked, 'IncludeWHT')}>
                    {t('wht')}
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

type TDynamicForm = { form: FormInstance; setBankId: any; bankId: any };

export default MainEntry;
