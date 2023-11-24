import { AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Checkbox, Col, Row, FormInstance, Form } from 'antd';
import { map } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../style.scss';
import {
  useGetAccountsBalance,
  useGetConfigration,
  useGetExpenseBranchSelect,
  useGetExpenseChequeNoSelect,
  useGetExpenseFetchAccountSelect,
  useGetExpenseProjectSelect,
} from '../queries/queries';
import { useAtom } from 'jotai';
import { totalValue } from './Atom';

function MainEntry({ form, setAgainstAccountId }: TDynamicForm) {
  const { t } = useTranslation();

  const [totalDebitAmounts, setTotalDebitAmounts] = useAtom(totalValue);
  const [chequeNoEnabled, setChequeNoEnabled] = useState(false);
  const [bankId, setBankId] = useState<number>(0);
  const { data } = useGetAccountsBalance(bankId);
  const { data: credit } = useGetExpenseFetchAccountSelect();
  const { data: chequeBooks } = useGetExpenseChequeNoSelect(bankId);
  const { data: chequeNoCompulsoryConfig } = useGetConfigration('ChequeBook Enabled');
  const isChequeNoCompulsory = chequeNoCompulsoryConfig?.data?.Data?.Result === 'True';
  const { data: branch, isSuccess, isLoading } = useGetExpenseBranchSelect();
  const { data: project, isSuccess: projectSuccess } = useGetExpenseProjectSelect();
  useEffect(() => {
    if (isSuccess && projectSuccess && !isLoading) {
      form.setFieldValue('BranchId', branch?.data?.Data?.Result?.[0]?.BranchName);
      form.setFieldValue('ProjectId', project?.data?.Data?.Result?.[0]?.ProjectName);
    }
  }, [isSuccess]);

  const handleCreditAccountChange = (value: any) => {
    setBankId(value);
    setAgainstAccountId(value);
  };

  const chequeBookOptions =
    chequeBooks?.data?.Data?.Result?.map((chequeBook: any) => ({
      label: chequeBook.CheqNo,
      value: chequeBook.Id,
    })) || [];

  useEffect(() => {
    form.setFieldValue('VoucherAmount', totalDebitAmounts);
  }, [credit, bankId, totalDebitAmounts]);

  const handleCheckboxChange = (isChecked: boolean, fieldName: string) => {
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: '-2%' }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card style={{ paddingBottom: '1%', boxShadow: '2px 4px 12px 1px gray' }}>
            <div className="form-list-container">
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 23, offset: 0 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 7, offset: 0 }}
                className="formfield"
              >
                <AntSelectDynamic
                  autoFocus
                  bordered={false}
                  label={t('branch')}
                  fieldValue="Id"
                  fieldLabel="BranchName"
                  name="BranchId"
                  query={useGetExpenseBranchSelect}
                />
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 23, offset: 0 }}
                md={{ span: 11, offset: 1 }}
                lg={{ span: 11, offset: 1 }}
                xl={{ span: 7, offset: 1 }}
                className="formfield"
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('project')}
                  fieldValue="Id"
                  fieldLabel="ProjectName"
                  name="ProjectId"
                  query={useGetExpenseProjectSelect}
                />
              </Col>

              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 23, offset: 0 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 7, offset: 1 }}
                className="formfield"
              >
                <AntDatePicker bordered={false} label={t('voucher_date')} name="VoucherDate" />{' '}
              </Col>
            </div>
            <br />
            <br />

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Card style={{ boxShadow: '2px 4px 12px 1px gray' }}>
                <div className="form-list-container">
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 23, offset: 0 }}
                    md={{ span: 11, offset: 0 }}
                    lg={{ span: 11, offset: 0 }}
                    xl={{ span: 7, offset: 0 }}
                    className="formfield1"
                    style={{
                      borderBottom: '1px solid gray',
                      height: '60px',
                      marginBottom: '1%',
                    }}
                  >
                    <p style={{ marginTop: 0 }}>
                      {t('credit_account_balance')} : <b> {data?.data?.Data?.Result?.[0]?.Balance.toFixed(2)}</b>
                    </p>
                    <AntSelectDynamic
                      required
                      bordered={false}
                      label={t('credit_account')}
                      fieldValue="Id"
                      fieldLabel="AccountTitle"
                      name="RefAccountId"
                      options={map(credit, (item: any) => ({
                        value: item.Id,
                        label: item.AccountTitle,
                      }))}
                      value={bankId}
                      onChange={(value) => handleCreditAccountChange(value)}
                    />
                  </Col>
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 23, offset: 0 }}
                    md={{ span: 11, offset: 1 }}
                    lg={{ span: 11, offset: 1 }}
                    xl={{ span: 7, offset: 1 }}
                    style={{ marginTop: '1.5%' }}
                    className="formfield"
                  >
                    <AntDatePicker bordered={false} name="ChequeDate" label={t('cheque_date')} />
                  </Col>
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 23, offset: 0 }}
                    md={{ span: 11, offset: 0 }}
                    lg={{ span: 11, offset: 0 }}
                    xl={{ span: 7, offset: 1 }}
                    className="formfield"
                    style={{ marginTop: '1.5%' }}
                  >
                    {chequeNoEnabled ? (
                      <AntInput bordered={false} label={t('cheque_no')} name="CheqId" required={isChequeNoCompulsory} />
                    ) : (
                      <AntSelectDynamic
                        required={isChequeNoCompulsory}
                        bordered={false}
                        label={t('cheque_no')}
                        fieldValue="Id"
                        fieldLabel="CheqNo"
                        name="ChequeNo"
                        options={chequeBookOptions}
                      />
                    )}
                  </Col>
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 23, offset: 0 }}
                    md={{ span: 11, offset: 1 }}
                    lg={{ span: 11, offset: 1 }}
                    xl={{ span: 7, offset: 0 }}
                    className="formfield paytitle"
                  >
                    <AntInput bordered={false} label={t('pay_title')} name="PayTitle" />
                  </Col>
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 23, offset: 0 }}
                    md={{ span: 23, offset: 0 }}
                    lg={{ span: 18, offset: 0 }}
                    xl={{ span: 7, offset: 1 }}
                    className="formfield remark"
                  >
                    <AntInput bordered={false} label={t('remarks')} name="Remarks" />
                  </Col>
                  <Col
                    xs={{ span: 15, offset: 0 }}
                    sm={{ span: 15, offset: 0 }}
                    md={{ span: 10, offset: 0 }}
                    lg={{ span: 10, offset: 19 }}
                    xl={{ span: 10, offset: 16 }}
                    style={{ marginTop: '-2%' }}
                  >
                    <label>
                      <Form.Item className="checkbox" name="IncludeWHT" valuePropName="checked" initialValue={true}>
                        <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'IncludeWHT')}>
                          {t('print_preview')}
                        </Checkbox>
                      </Form.Item>
                    </label>
                  </Col>
                </div>
              </Card>
            </Col>
          </Card>
        </Col>
      </Row>
      <br />
      <br />
    </>
  );
}

type TDynamicForm = { form: FormInstance; setAgainstAccountId: any };

export default MainEntry;
