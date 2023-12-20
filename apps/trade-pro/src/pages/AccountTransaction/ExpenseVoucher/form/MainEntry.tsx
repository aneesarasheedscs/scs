import { AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Checkbox, Col, Row, FormInstance, Form } from 'antd';
import { map } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../style.scss';
import {
  useGetAccountsBalance,
  useGetConfigration,
  useGetExpenseFetchAccountSelect,
  useGetExpenseProjectSelect,
} from '../queries/queries';
import { useGetContraChequeNoSelect } from '@tradePro/pages/ContraVoucher/queries/queries';
import { useAtom } from 'jotai';
import { totalValue } from './Atom';

function MainEntry({ form, setAgainstAccountId }: TDynamicForm) {
  const { t } = useTranslation();

  const [totalDebitAmounts, setTotalDebitAmounts] = useAtom(totalValue);
  const [chequeNoEnabled, setChequeNoEnabled] = useState(false);
  const [bankId, setBankId] = useState<number>(0);
  const { data } = useGetAccountsBalance(bankId);
  const { data: credit } = useGetExpenseFetchAccountSelect();
  const { data: chequeBooks } = useGetContraChequeNoSelect(bankId);
  const { data: chequeNoCompulsoryConfig } = useGetConfigration('ChequeBook Enabled');
  const isChequeNoCompulsory = chequeNoCompulsoryConfig?.data?.Data?.Result === 'True';
  const { data: project, isSuccess, isLoading } = useGetExpenseProjectSelect();
  useEffect(() => {
    if (isSuccess && !isLoading) {
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
      <Row gutter={[10, 10]} style={{ marginTop: '-2%' }}>
        <Col span={24}>
          <Card style={{ paddingBottom: '0.5%', boxShadow: '2px 4px 12px 1px gray' }}>
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
                md={{ span: 11, offset: 1 }}
                lg={{ span: 11, offset: 1 }}
                xl={{ span: 7, offset: 1 }}
                className="formfield credit"
              >
                <p style={{ marginTop: -18, marginLeft: '50%' }} className="cr">
                  Cr : <b> {data?.data?.Data?.Result?.[0]?.Balance.toFixed(2)}</b>
                </p>
                <p style={{ marginTop: -4 }}>
                  <AntSelectDynamic
                    required
                    bordered={false}
                    label={t('credit_account')}
                    fieldValue="Id"
                    fieldLabel="AccountTitle"
                    name="AgainstAccountId"
                    options={map(credit, (item: any) => ({
                      value: item.Id,
                      label: item.AccountTitle,
                    }))}
                    value={bankId}
                    onChange={(value) => handleCreditAccountChange(value)}
                  />
                </p>
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 23, offset: 0 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 7, offset: 1 }}
                // style={{ marginTop: '1.5%' }}
                className="formfield date"
              >
                <AntDatePicker bordered={false} name="ChequeDate" label={t('cheque_date')} />
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 23, offset: 0 }}
                md={{ span: 11, offset: 1 }}
                lg={{ span: 11, offset: 1 }}
                xl={{ span: 7, offset: 0 }}
                className="formfield cheqno"
                style={{ marginTop: '1%' }}
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
                    name="CheqId"
                    options={chequeBookOptions}
                  />
                )}
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 23, offset: 0 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 7, offset: 1 }}
                style={{ marginTop: '1%' }}
                className="formfield paytitle"
              >
                <AntInput bordered={false} label={t('pay_title')} name="PayTitle" />
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 23, offset: 0 }}
                md={{ span: 11, offset: 1 }}
                lg={{ span: 11, offset: 1 }}
                xl={{ span: 7, offset: 1 }}
                style={{ marginTop: '1%' }}
                className="formfield remark"
              >
                <AntInput bordered={false} label={t('remarks')} name="Remarks" />
              </Col>
            </div>
          </Card>
        </Col>
        {/* </Card> */}
        {/* </Col>*/}
      </Row>
      <br />
      <br />
    </>
  );
}

type TDynamicForm = { form: FormInstance; setAgainstAccountId: any };

export default MainEntry;
